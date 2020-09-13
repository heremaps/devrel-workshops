# Welcome to the Virtual Grace Hopper Celebration 2020!

## Workshop Topic
### Sensor (LiDAR) To HD Maps For Driverless Cars: Visualize The Transformation In 3D

Understanding the steps involved in HD map-making and seeing them come alive by visualizing them using a 3D-map rendering engine is like hitting two targets with one arrow.

Walk away with visualization of LiDAR point-clouds collected by HERE cars, raw features extracted from LiDAR (Light Detection & Ranging) imagery and the final HD-map. 

This will be achieved using an open-source 3D web-map rendering engine – [harp.gl](https://www.harp.gl/)

#### Section 1: Initial App Setup

##### Register for a free HERE Account

Go to https://developer.here.com/sign-up?create=Freemium-Basic&keepState=true&step=account

Create an API key

##### Create basic harp application

```bash
npm init @here/harp.gl-app
```

Choose Language as Typescript

When asked for an APIKey, use the one created above

FIXME: Why is this necessary

```bash
THREE=`npm view @here/harp-mapview peerDependencies.three`
npm install --save three@$THREE
```

All the above steps have already been done in the folder : ./intermediate/initial
You have an option to skip the steps above

#### Section 2: Run the App

```
npm start
```

You should be able to see a map as shown below:

![](MapGIF.gif)


