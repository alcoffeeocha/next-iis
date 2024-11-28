const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000;

const nextConfig = {"env":{},"webpack":null,"eslint":{"ignoreDuringBuilds":false},"typescript":{"ignoreBuildErrors":false,"tsconfigPath":"tsconfig.json"},"distDir":"./.next","cleanDistDir":true,"assetPrefix":"","cacheMaxMemorySize":52428800,"configOrigin":"next.config.ts","useFileSystemPublicRoutes":true,"generateEtags":true,"pageExtensions":["tsx","ts","jsx","js"],"poweredByHeader":true,"compress":true,"images":{"deviceSizes":[640,750,828,1080,1200,1920,2048,3840],"imageSizes":[16,32,48,64,96,128,256,384],"path":"/_next/image","loader":"default","loaderFile":"","domains":[],"disableStaticImages":false,"minimumCacheTTL":60,"formats":["image/webp"],"dangerouslyAllowSVG":false,"contentSecurityPolicy":"script-src 'none'; frame-src 'none'; sandbox;","contentDispositionType":"attachment","remotePatterns":[],"unoptimized":false},"devIndicators":{"appIsrStatus":true,"buildActivity":true,"buildActivityPosition":"bottom-right"},"onDemandEntries":{"maxInactiveAge":60000,"pagesBufferLength":5},"amp":{"canonicalBase":""},"basePath":"","sassOptions":{},"trailingSlash":false,"i18n":null,"productionBrowserSourceMaps":false,"excludeDefaultMomentLocales":true,"serverRuntimeConfig":{},"publicRuntimeConfig":{},"reactProductionProfiling":false,"reactStrictMode":null,"reactMaxHeadersLength":6000,"httpAgentOptions":{"keepAlive":true},"logging":{},"expireTime":31536000,"staticPageGenerationTimeout":60,"output":"standalone","modularizeImports":{"@mui/icons-material":{"transform":"@mui/icons-material/{{member}}"},"lodash":{"transform":"lodash/{{member}}"}},"outputFileTracingRoot":"C:\\Users\\Lenovo\\Documents\\next-iis","experimental":{"cacheLife":{"default":{"stale":300,"revalidate":900,"expire":4294967294},"seconds":{"stale":0,"revalidate":1,"expire":60},"minutes":{"stale":300,"revalidate":60,"expire":3600},"hours":{"stale":300,"revalidate":3600,"expire":86400},"days":{"stale":300,"revalidate":86400,"expire":604800},"weeks":{"stale":300,"revalidate":604800,"expire":2592000},"max":{"stale":300,"revalidate":2592000,"expire":4294967294}},"cacheHandlers":{},"multiZoneDraftMode":false,"appNavFailHandling":false,"prerenderEarlyExit":true,"serverMinification":true,"serverSourceMaps":false,"linkNoTouchStart":false,"caseSensitiveRoutes":false,"preloadEntriesOnStart":true,"clientRouterFilter":true,"clientRouterFilterRedirects":false,"fetchCacheKeyPrefix":"","middlewarePrefetch":"flexible","optimisticClientCache":true,"manualClientBasePath":false,"cpus":7,"memoryBasedWorkersCount":false,"imgOptConcurrency":null,"imgOptTimeoutInSeconds":7,"imgOptMaxInputPixels":268402689,"imgOptSequentialRead":null,"isrFlushToDisk":true,"workerThreads":false,"optimizeCss":false,"nextScriptWorkers":false,"scrollRestoration":false,"externalDir":false,"disableOptimizedLoading":false,"gzipSize":true,"craCompat":false,"esmExternals":true,"fullySpecified":false,"swcTraceProfiling":false,"forceSwcTransforms":false,"largePageDataBytes":128000,"turbo":{"root":"C:\\Users\\Lenovo\\Documents\\next-iis"},"typedRoutes":false,"typedEnv":false,"parallelServerCompiles":false,"parallelServerBuildTraces":false,"ppr":false,"reactOwnerStack":false,"webpackMemoryOptimizations":false,"optimizeServerReact":true,"useEarlyImport":false,"staleTimes":{"dynamic":0,"static":300},"after":false,"serverComponentsHmrCache":true,"staticGenerationMaxConcurrency":8,"staticGenerationMinPagesPerWorker":25,"dynamicIO":false,"optimizePackageImports":["lucide-react","date-fns","lodash-es","ramda","antd","react-bootstrap","ahooks","@ant-design/icons","@headlessui/react","@headlessui-float/react","@heroicons/react/20/solid","@heroicons/react/24/solid","@heroicons/react/24/outline","@visx/visx","@tremor/react","rxjs","@mui/material","@mui/icons-material","recharts","react-use","effect","@effect/schema","@effect/platform","@effect/platform-node","@effect/platform-browser","@effect/platform-bun","@effect/sql","@effect/sql-mssql","@effect/sql-mysql2","@effect/sql-pg","@effect/sql-squlite-node","@effect/sql-squlite-bun","@effect/sql-squlite-wasm","@effect/sql-squlite-react-native","@effect/rpc","@effect/rpc-http","@effect/typeclass","@effect/experimental","@effect/opentelemetry","@material-ui/core","@material-ui/icons","@tabler/icons-react","mui-core","react-icons/ai","react-icons/bi","react-icons/bs","react-icons/cg","react-icons/ci","react-icons/di","react-icons/fa","react-icons/fa6","react-icons/fc","react-icons/fi","react-icons/gi","react-icons/go","react-icons/gr","react-icons/hi","react-icons/hi2","react-icons/im","react-icons/io","react-icons/io5","react-icons/lia","react-icons/lib","react-icons/lu","react-icons/md","react-icons/pi","react-icons/ri","react-icons/rx","react-icons/si","react-icons/sl","react-icons/tb","react-icons/tfi","react-icons/ti","react-icons/vsc","react-icons/wi"],"trustHostHeader":false,"isExperimentalCompile":false},"bundlePagesRouterDependencies":false,"configFileName":"next.config.ts"}

process.env.__NEXT_PRIVATE_STANDALONE_CONFIG = JSON.stringify(nextConfig)

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (pathname === '/a') {
      app.render(req, res, '/a', query)
    } else if (pathname === '/b') {
      app.render(req, res, '/b', query)
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})