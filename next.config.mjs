/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Esegui transpilation di moduli specifici se necessario
  transpilePackages: ['three'],
};

export default nextConfig;
