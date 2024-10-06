const { exec } = require('child_process');

// Function to execute a command and handle the output
const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return reject(error);
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return reject(stderr);
      }
      console.log(`Stdout: ${stdout}`);
      resolve(stdout);
    });
  });
};

// Main deployment function
const deploy = async () => {
  try {
    console.log('Building the project...');
    await runCommand('npm run build');

    console.log('Copying build files to Nginx root...');
    await runCommand('sudo cp -r dist/* /var/www/html/');

    console.log('Changing ownership of files...');
    await runCommand('sudo chown -R www-data:www-data /var/www/html/');

    console.log('Restarting Nginx...');
    await runCommand('sudo systemctl restart nginx');

    console.log('Deployment successful!');
  } catch (error) {
    console.error('Deployment failed:', error);
  }
};

// Run the deployment
deploy();
