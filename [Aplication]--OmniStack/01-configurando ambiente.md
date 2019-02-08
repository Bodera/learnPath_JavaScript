```javascript
npx create-react-app omni-week
cd omni-week
npm start
```
Then open http://localhost:3000/ to see your app. Edit `src/App.js` and save to reload.

Now install the command line interface for React.
```javascript
npm install -g react-native-cli
```

Almost done, now we have to install a Android SDK and download a mobile simulator. My machine runs a Linux distro, so I have dowloaded the `sdk-tools-linux-4333796.zip` from [here](https://developer.android.com/studio/#downloads). 

1. Create a folder for the SDK
2. Extract the zip file into the created folder.
3. Add the following commands to the user profile.

```bash
$ nano ~/.profile
# adding Android Sdk to PATH.
export ANDROID_HOME=/home/bode/Codes/01-Dev/Sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools
```
Then run the following code to start the installation process.
```bash
/home/bode/Codes/01-Dev/Sdk/tools/bin/sdkmanager "platform-tools" "platforms;android-27" "build-tools;27.0.3" 
``` 
I also receive instructions to use the GenyMotion simulator. For that the VirtualBox must be installed in your machine, so just type `sudo apt-get install virtualbox` in your terminal. 

Now go to [GenyMotion download page](https://www.genymotion.com/fun-zone/) and get your personal edition. I moved the archive to the Sdk folder that I've created, now it's just about extract the binary.

```bash
$ chmod +x genymotion-3.0.0-linux_x64.bin
./genymotion-3.0.0-linux_x64.bin
```
The installation should start when hit Entet after the last command. To open the aplication run
> ./genymotion

Now go to Settings > ABD tool connection settings. And select the radio button for Use custom Android SDK tools and specify the path.

Finally go to Add and pick a device, I will use a Samsung Galaxy S6 powered with Android 7.1 API 25. And wait the download finish.