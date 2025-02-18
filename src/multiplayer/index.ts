import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';

const client = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_URL);


export async function joinChannel(itemId:string,user:string){    
    const room = client.channel(`room:${itemId}`);

    const presenceTrackStatus = await room.track({
        user: 'user-1',
        online_at: new Date().toISOString(),
    });

    return {
        room,
        presenceTrackStatus
    }
}