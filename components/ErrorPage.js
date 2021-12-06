import React from 'react';

export default function ErrorPage() {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <h1 className="title">Something exploded 😭</h1>
      <p className="text-center">
        Make sure that the scribo bot has access to the repository and that it
        checked your last commit.
        <br /> Our <a href="https://gitread.me/scribo">tutorial</a> might help
        you solve this issue
      </p>
    </div>
  );
}
