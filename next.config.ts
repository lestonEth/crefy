import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // // Add file loader configuration
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next",
          name: "static/media/[name].[hash].[ext]",
        },
      },
    });

    return config;
  }
};

export default nextConfig;
