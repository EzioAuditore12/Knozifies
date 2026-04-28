import { Socket } from 'socket.io-client';
import { useAuthStore } from '@/store/auth';
import { refreshAccessToken } from '../token-manager';

export type SocketError = Error & { data?: { status: number } };

export const handleWsTokenRefresh = async (err: SocketError, socket: Socket) => {
  console.log('❌ WS connect error:', err.message);

  // Check for the custom status we added on the server
  if (err.data?.status === 401) {
    // 1. STOP the auto-reconnect loop immediately
    socket.disconnect();

    console.log('🔄 Token expired. Attempting refresh...');

    try {
      // 2. Wait for the shared refresh logic to complete
      await refreshAccessToken();

      // 3. Get the new token
      const newAccessToken = useAuthStore.getState().tokens?.accessToken;

      if (newAccessToken) {
        console.log('✅ Token refreshed. Reconnecting socket...');

        // 4. Update the socket's auth object
        socket.auth = { token: newAccessToken };

        // 5. Manually reconnect
        socket.connect();
      }
    } catch (refreshError) {
      console.error('❌ Token refresh failed.', refreshError);

      useAuthStore.getState().logout();
    }
  }
};
