import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import Head from 'next/head';

const navigation = [
  { name: 'Open-Source', href: 'https://github.com/scribo-dev/gitreadme' },
  {
    name: 'Documentation',
    href: 'https://gitread.me/gitreadme/gitreadme-public-docs'
  }
];

export default function Home() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>Git Readme - Documentation Website Builder</title>
        <meta
          name="description"
          content="Open-Source Documentation website builder for GitHub repositories"
        />
      </Head>
      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 h-full w-full" aria-hidden="true">
          <div className="relative h-full">
            <svg
              className="absolute right-full transform translate-y-1/3 translate-x-1/4 md:translate-y-1/2 sm:translate-x-1/2 lg:translate-x-full"
              width={404}
              height={784}
              fill="none"
              viewBox="0 0 404 784"
            >
              <defs>
                <pattern
                  id="e229dbec-10e9-49ee-8ec3-0286ca089edf"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200 dark:text-gray-600"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={784}
                fill="url(#e229dbec-10e9-49ee-8ec3-0286ca089edf)"
              />
            </svg>
            <svg
              className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 sm:-translate-x-1/2 md:-translate-y-1/2 lg:-translate-x-3/4"
              width={404}
              height={784}
              fill="none"
              viewBox="0 0 404 784"
            >
              <defs>
                <pattern
                  id="d2a68204-c383-44b1-b99f-42ccff4e5365"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200 dark:text-gray-600"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={784}
                fill="url(#d2a68204-c383-44b1-b99f-42ccff4e5365)"
              />
            </svg>
          </div>
        </div>

        <div className="relative pt-6 pb-16 sm:pb-24">
          <Popover>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <nav
                className="relative flex items-center justify-between sm:h-10 md:justify-center"
                aria-label="Global"
              >
                <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                  <div className="flex items-center justify-between w-full md:w-auto text-blue-600 dark:text-white">
                    <a href="#">
                      <span className="sr-only">Workflow</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="180"
                        height="41"
                        viewBox="0 0 437 101"
                        fill="none"
                      >
                        <path
                          d="M39.84 75.88L9.44 55.72V49.16L39.84 29V37.56L17.2 52.28V52.6L39.84 67.32V75.88ZM75.1688 79.96C71.8621 79.96 68.7688 79.3733 65.8888 78.2C63.0621 77.0267 60.6088 75.2933 58.5287 73C56.4488 70.7067 54.7954 67.88 53.5688 64.52C52.3954 61.16 51.8088 57.32 51.8088 53C51.8088 48.68 52.3954 44.84 53.5688 41.48C54.7954 38.12 56.4488 35.2667 58.5287 32.92C60.6621 30.5733 63.1688 28.7867 66.0488 27.56C68.9821 26.3333 72.1554 25.72 75.5688 25.72C79.0354 25.72 81.9688 26.4133 84.3688 27.8C86.8221 29.1333 88.8221 30.6267 90.3688 32.28L85.2488 38.04C84.0221 36.8133 82.6621 35.8 81.1688 35C79.7288 34.2 77.8621 33.8 75.5688 33.8C73.4888 33.8 71.5688 34.2533 69.8088 35.16C68.1021 36.0133 66.6088 37.2667 65.3288 38.92C64.1021 40.52 63.1421 42.4933 62.4488 44.84C61.7554 47.1867 61.4088 49.8267 61.4088 52.76C61.4088 58.7333 62.6088 63.4267 65.0088 66.84C67.4621 70.2 71.0354 71.88 75.7288 71.88C77.1154 71.88 78.4488 71.6933 79.7288 71.32C81.0088 70.8933 82.0221 70.3067 82.7688 69.56V58.28H73.7288V50.68H91.1688V73.72C89.4621 75.4267 87.1954 76.8933 84.3688 78.12C81.5954 79.3467 78.5288 79.96 75.1688 79.96ZM119.698 79V47H102.658V39.72H128.898V79H119.698ZM123.698 32.52C121.831 32.52 120.258 31.96 118.978 30.84C117.751 29.72 117.138 28.2267 117.138 26.36C117.138 24.4933 117.751 23 118.978 21.88C120.258 20.7067 121.831 20.12 123.698 20.12C125.564 20.12 127.111 20.7067 128.338 21.88C129.618 23 130.258 24.4933 130.258 26.36C130.258 28.2267 129.618 29.72 128.338 30.84C127.111 31.96 125.564 32.52 123.698 32.52ZM175.186 79.96C172.2 79.96 169.666 79.56 167.586 78.76C165.56 77.96 163.906 76.84 162.626 75.4C161.4 73.9067 160.493 72.12 159.906 70.04C159.373 67.96 159.106 65.6667 159.106 63.16V47H148.626V40.12L159.506 39.72L160.706 27.4H168.306V39.72H186.226V47H168.306V63.16C168.306 66.4133 168.973 68.8133 170.306 70.36C171.693 71.8533 174.066 72.6 177.426 72.6C179.08 72.6 180.6 72.4667 181.986 72.2C183.373 71.88 184.706 71.48 185.986 71L187.746 77.72C185.986 78.3067 184.093 78.8133 182.066 79.24C180.04 79.72 177.746 79.96 175.186 79.96ZM200.035 75.88V67.32L222.675 52.6V52.28L200.035 37.56V29L230.435 49.16V55.72L200.035 75.88ZM246.564 79V26.68H264.004C266.724 26.68 269.257 26.9467 271.604 27.48C273.95 28.0133 275.977 28.8933 277.684 30.12C279.444 31.2933 280.804 32.8667 281.764 34.84C282.777 36.8133 283.284 39.2667 283.284 42.2C283.284 46.2 282.324 49.4267 280.404 51.88C278.537 54.3333 276.03 56.0933 272.884 57.16L285.364 79H274.884L263.684 58.52H255.844V79H246.564ZM255.844 51.16H263.044C266.67 51.16 269.417 50.4133 271.284 48.92C273.204 47.4267 274.164 45.1867 274.164 42.2C274.164 39.16 273.204 37.0533 271.284 35.88C269.417 34.7067 266.67 34.12 263.044 34.12H255.844V51.16ZM296.053 79V26.68H329.573V34.52H305.333V47.88H325.893V55.72H305.333V71.16H330.373V79H296.053ZM354.821 51.16L352.981 57.56H366.261L364.421 51.16C363.675 48.3867 362.901 45.56 362.101 42.68C361.301 39.7467 360.528 36.8133 359.781 33.88H359.461C358.715 36.8133 357.941 39.7467 357.141 42.68C356.395 45.56 355.621 48.3867 354.821 51.16ZM337.381 79L354.341 26.68H365.221L382.181 79H372.341L368.341 64.84H350.901L346.821 79H337.381ZM389.99 79V26.68H403.75C411.483 26.68 417.51 28.84 421.83 33.16C426.203 37.48 428.39 43.96 428.39 52.6C428.39 56.92 427.83 60.7333 426.71 64.04C425.59 67.3467 423.99 70.12 421.91 72.36C419.83 74.5467 417.297 76.2 414.31 77.32C411.323 78.44 407.963 79 404.23 79H389.99ZM399.27 71.48H403.19C408.203 71.48 412.07 69.96 414.79 66.92C417.51 63.8267 418.87 59.0533 418.87 52.6C418.87 46.2 417.51 41.5333 414.79 38.6C412.07 35.6667 408.203 34.2 403.19 34.2H399.27V71.48Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                    <div className="-mr-2 flex items-center md:hidden">
                      <Popover.Button className="bg-gray-50 dark:bg-gray-700 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                        <span className="sr-only">Open main menu</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 0 24 24"
                          width="24px"
                          fill="currentColor"
                        >
                          <path d="M0 0h24v24H0V0z" fill="none" />
                          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                        </svg>
                      </Popover.Button>
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex md:space-x-10">
                  {navigation.map(item => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
                  <span className="inline-flex rounded-md shadow">
                    <a
                      href="#"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:text-blue-500"
                    >
                      Pro Plan
                    </a>
                  </span>
                </div>
              </nav>
            </div>

            <Transition
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
              >
                <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className="px-5 pt-4 flex items-center justify-between">
                    <div>
                      <img className="h-8 w-auto" src="logo.svg" alt="" />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                        <span className="sr-only">Close main menu</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                          <path d="M0 0h24v24H0z" fill="none" />
                        </svg>
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigation.map(item => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <a
                    href="#"
                    className="block w-full px-5 py-3 text-center font-medium text-blue-600 bg-gray-50 hover:bg-gray-100 hover:text-blue-700"
                  >
                    Log in
                  </a>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <div className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-gray-50 sm:text-5xl md:text-6xl">
                <span className="block">Open-Source Documentation</span>
                <span className="block text-blue-600">Website Builder</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                With Git Readme you can create documentation websites for your
                GitHub repositories in a few minutes
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex flex-col" aria-hidden="true">
            <div className="flex-1" />
            <div className="flex-1 w-full bg-gray-800" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-[788px]">
            <video
              src="https://dwu86ft0a6abz.cloudfront.net/gitread/public/gitreadme.mp4"
              className="h-full"
              controls
            >
              <source src="https://dwu86ft0a6abz.cloudfront.net/gitread/public/gitreadme.mp4" />
            </video>
          </div>
        </div>
      </div>
      <div className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8"></div>
      </div>
    </div>
  );
}
