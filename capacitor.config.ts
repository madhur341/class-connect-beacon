import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.8a08e7fc4954408db8deb51118f3cb47',
  appName: 'class-connect-beacon',
  webDir: 'dist',
  server: {
    url: 'https://8a08e7fc-4954-408d-b8de-b51118f3cb47.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#3B82F6',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;