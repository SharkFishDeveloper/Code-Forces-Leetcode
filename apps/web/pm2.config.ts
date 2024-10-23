module.exports = {
    apps: [
      {
        name: 'my-web-app',
        script: 'npm',
        args: 'run dev',
        cwd: './', // This should be the path where your package.json is located
        watch: true,
        env: {
          NODE_ENV: 'development',
        },
      },
    ],
  };
  