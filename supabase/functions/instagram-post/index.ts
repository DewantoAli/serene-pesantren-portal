import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface InstagramPostRequest {
  imageUrl: string;
  caption?: string;
}

interface MediaContainerResponse {
  id: string;
}

interface PublishResponse {
  id: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const accessToken = Deno.env.get('INSTAGRAM_ACCESS_TOKEN');
    
    if (!accessToken) {
      return new Response(
        JSON.stringify({ error: 'Instagram access token not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get Instagram User ID first
    const userResponse = await fetch(
      `https://graph.instagram.com/v22.0/me?fields=id,username&access_token=${accessToken}`
    );
    
    if (!userResponse.ok) {
      const errorData = await userResponse.json();
      console.error('Failed to get Instagram user:', errorData);
      return new Response(
        JSON.stringify({ error: 'Failed to get Instagram user', details: errorData }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userData = await userResponse.json();
    const instagramUserId = userData.id;
    console.log('Instagram User ID:', instagramUserId, 'Username:', userData.username);

    // Parse request body
    const { imageUrl, caption = '' }: InstagramPostRequest = await req.json();

    if (!imageUrl) {
      return new Response(
        JSON.stringify({ error: 'Image URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate image URL is publicly accessible
    if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
      return new Response(
        JSON.stringify({ error: 'Image URL must be a valid HTTP/HTTPS URL' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Creating media container for image:', imageUrl);

    // Step 1: Create a media container
    const createMediaUrl = `https://graph.instagram.com/v22.0/${instagramUserId}/media`;
    const createMediaParams = new URLSearchParams({
      image_url: imageUrl,
      caption: caption,
      access_token: accessToken,
    });

    const createMediaResponse = await fetch(createMediaUrl, {
      method: 'POST',
      body: createMediaParams,
    });

    const createMediaData = await createMediaResponse.json();
    
    if (!createMediaResponse.ok) {
      console.error('Failed to create media container:', createMediaData);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to create media container', 
          details: createMediaData,
          hint: 'Make sure the image URL is publicly accessible and in JPEG format'
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const mediaContainerId = (createMediaData as MediaContainerResponse).id;
    console.log('Media container created:', mediaContainerId);

    // Step 2: Wait for media to be ready (Instagram needs time to process)
    // Check container status before publishing
    let containerReady = false;
    let attempts = 0;
    const maxAttempts = 10;

    while (!containerReady && attempts < maxAttempts) {
      const statusResponse = await fetch(
        `https://graph.instagram.com/v22.0/${mediaContainerId}?fields=status_code&access_token=${accessToken}`
      );
      const statusData = await statusResponse.json();
      
      console.log('Container status:', statusData);
      
      if (statusData.status_code === 'FINISHED') {
        containerReady = true;
      } else if (statusData.status_code === 'ERROR') {
        return new Response(
          JSON.stringify({ 
            error: 'Media processing failed', 
            details: statusData 
          }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } else {
        // Wait 2 seconds before checking again
        await new Promise(resolve => setTimeout(resolve, 2000));
        attempts++;
      }
    }

    if (!containerReady) {
      return new Response(
        JSON.stringify({ 
          error: 'Media processing timeout',
          hint: 'The image is still being processed. Try again in a few seconds.'
        }),
        { status: 408, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Step 3: Publish the media container
    const publishUrl = `https://graph.instagram.com/v22.0/${instagramUserId}/media_publish`;
    const publishParams = new URLSearchParams({
      creation_id: mediaContainerId,
      access_token: accessToken,
    });

    const publishResponse = await fetch(publishUrl, {
      method: 'POST',
      body: publishParams,
    });

    const publishData = await publishResponse.json();
    
    if (!publishResponse.ok) {
      console.error('Failed to publish media:', publishData);
      return new Response(
        JSON.stringify({ error: 'Failed to publish media', details: publishData }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const postId = (publishData as PublishResponse).id;
    console.log('Media published successfully:', postId);

    return new Response(
      JSON.stringify({ 
        success: true, 
        postId: postId,
        message: 'Photo posted to Instagram successfully!',
        instagramUrl: `https://www.instagram.com/p/${postId}/`
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error posting to Instagram:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
