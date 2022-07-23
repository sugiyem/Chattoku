import "dotenv/config";

export default {
  expo: {
    name: "Chattoku",
    slug: "Chattoku",
    privacy: "public",
    owner: "w-orbital",
    description:
      "A cross platform mobile application specifically made for the otaku community",
    icon: "./src/assets/logo.png",
    version: "1.0.0",
    assetBundlePatterns: ["**/*"],
    orientation: "portrait",
    ios: {
      bundleIdentifier: "com.WOrbital.Chattoku",
      buildNumber: "1.0.0"
    },
    android: {
      package: "com.WOrbital.Chattoku",
      googleServicesFile: "./google-services.json",
      useNextNotificationsApi: true,
      versionCode: 1
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID
    }
  }
};
