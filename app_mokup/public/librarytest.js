/*
 * TribeLibCam
 * Copyright 2020
 * Author: Kayman Lab
 * All Rights Reserved.
 * Use, reproduction, distribution, and modification of this code is subject to the terms and
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * Project: --
 */
  createVideo = () => {
      const video = document.createElement('video');
      video.setAttribute('autoplay','false');
      video.setAttribute('controls', 'false');
      video.setAttribute('width', '460');
      video.setAttribute('height', '360');
      video.style = 'border-radius: 10px; pointer-events: none;'
      return video;
    };

    createCanvas = (width, height) => {
        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        canvas.style.display = 'none';
        return canvas;
      };
      
  document.addEventListener("DOMContentLoaded", (e) => {
    console.log("DOM fully loaded and parsed");
    function TribeLibCam() {
    /**
    * @desc Library that use for remove background
    * and add blur using TensorFlow
    */

    const canvas = createCanvas(455, 360);
    const btnBlur = document.querySelector("#btnBlur");
    const btnVirtualBackground = document.querySelector("#btnVirtualBackground");
    const btnPermissions = document.getElementById("btnPermissions");
    const replaceCam = document.querySelector("#replaceCam");
    const video = createVideo();
    const videoReal = createVideo();
    const streamCanva = canvas.captureStream(25);
    const streamVideo = video.captureStream(25);
    let change = 0;
    let estadoBlur = 0;
    let estadoBackground = 0;

    this.modelConfigs = {
      GoodPC: {
        architecture: "ResNet50",
        outputStride: 32,
        quantBytes: 2,
      },

      MediumPC: {
        architecture: "MobileNetV1",
        outputStride: 16,
        multiplier: 1,
        quantBytes: 4,
      },

      SlowPC: {
        architecture: "MobileNetV1",
        outputStride: 16,
        multiplier: 0.75,
        quantBytes: 2,
      },

      SuperSlowPC: {
        architecture: "MobileNetV1",
        outputStride: 16,
        multiplier: 0.5,
        quantBytes: 2,
      },
    };

    this.segmentationConfigs = {
      GoodSeg: {
        flipHorizontal: false,
        internalResolution: "full",
        segmentationThreshold: 0.7,
      },

      MediumSeg: {
        flipHorizontal: false,
        internalResolution: "medium",
        segmentationThreshold: 0.7,
      },

      LowSeg: {
        flipHorizontal: false,
        internalResolution: "low",
        segmentationThreshold: 0.7,
      },
    };

    this.PersonalModelConfig = (architec, multipl, quantByt) => {
      let personalModelConfig = {
        architecture: architec,
        outputStride: 16,
        multiplier: multipl,
        quantBytes: quantByt,
      };

      return personalModelConfig;
    };

    this.GetDevices = async () => {
      /**
      * @desc Obtain permissions of camera and microfone
      * @return Array - Contains video device information
      */

      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.log("Devices not support");
        return [];
      } else {
        let devices = await navigator.mediaDevices.enumerateDevices();
        console.log(devices);
        let VideoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );

        if (VideoDevices[0].deviceid == "") {
          console.log("Devices permissions denied");
        }
        else
        {
          while (replaceCam.firstChild) {
          //Elimina todo los nodos
            replaceCam.removeChild(replaceCam.firstChild);
          }
          videoReal.srcObject = streamVideo;
          replaceCam.appendChild(videoReal);
          return VideoDevices;
        }
      }
    };

    this.stopVideo = () => {
      /**
      * @desc Stop every track in the video
      * @return Nothing
      */

      if (video && video.srcObject) {
        video.srcObject.getTracks().forEach((track) => {
          track.stop();
        });
        video.srcObject = null;
      }
    };

    this.setVideo = async () => {
      /**
      * @desc Config the video device
      * @return a promise that set config in the video and canva tags
      */

      this.stopVideo(video);
      const config = {
        audio: false,
        video: {
          width: { ideal: 455 },
          height: { ideal: 360 },
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(config);
      video.srcObject = stream;

      return this.PromiseCreator();
    };

    this.PromiseCreator = () => {
      /**
      * @desc Set the video config and set width and height in the canvas and video tags
      * @return the promise resolve
      */

      return new Promise((resolve, reject) => {
        video.onloadedmetadata = () => {
          video.width = video.videoWidth;
          video.height = video.videoHeight;
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          resolve(video);
        };
      });
    };

    this.loadVideo = async () => {
      /**
      * @desc Play what the camera shows on video
      * @return Nothing
      */

      let state_video;
      try {
        state_video = await this.setVideo();
      } catch (e) {
        throw e;
      }
      state_video.play();
    };

    this.loadModel = () => {
      /**
      * @desc Load the bodipix model to use
      * @return The loaded model
      */

      const net = bodyPix.load(this.modelConfigs.SuperSlowPC);
      return net;
    };

    this.makePredictionPerson = async () => {
      /**
      * @desc Make the prediction using the previously loaded model
      * @return The prediction or segmentation of the person
      */

      let prediction;
      let net = await this.loadModel();
      prediction = await net.segmentPerson(
        video,
        this.segmentationConfigs.GoodSeg,
      );
      return prediction;
    };

    //Effects in the canvas
    this.clearCanvas = async () => {
      const context = canvas.getContext("2d");
      await context.clearRect(0, 0, canvas.width, canvas.height);
    };

    this.buttonActivate = async (effect) => {
      if (!effect) {
      } else {
        if (effect === 1) {
          await this.virtualBackground();
        } else if (effect === 2) {
          await this.blurBackground(canvas, video, 18, 15, false);
        }
      }
    };

    this.clearCanvas = async () => {
      const context = canvas.getContext("2d");
      await context.clearRect(0, 0, canvas.width, canvas.height);
    };

    this.removeBackground = async () => {
      const context = canvas.getContext("2d");
      const camera = video;
      let prediction = await this.makePredictionPerson();
      context.drawImage(camera, 0, 0, camera.width, camera.height);
      var imageData = context.getImageData(0, 0, camera.width, camera.height);
      var pixel = imageData.data; //los pixeles de la imagen
      for (var p = 0; p < pixel.length; p += 4) {
        if (prediction.data[p / 4] == 0) {
          pixel[p + 3] = 0; // la matrix es de RGB A la idea es poner la transparencia en 0
        }
      }
      context.imageSmoothingEnabled = true;
      context.putImageData(imageData, 0, 0);
    };

    this.blurBackground = async (
      canvas,
      img_video,
      backgroundBlurAmount = 10,
      edgeBlurAmount = 5,
      flipHorizontal
    ) => {
      let prediction = await this.makePredictionPerson();
      await bodyPix.drawBokehEffect(
        canvas,
        img_video,
        prediction,
        backgroundBlurAmount,
        edgeBlurAmount,
        flipHorizontal
      );
    };

    this.virtualBackground = async () => {
      if (canvas.style.backgroundImage == "") {
        await this.removeBackground();
        canvas.style.backgroundImage =
          "url('https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-1.2.1&w=1000&q=80')";
      } else {
        await this.removeBackground();
      }
    };

    this.draw = async () => {
      //await this.removeBackground();
      //await this.virtualBackground();
      //await this.blurBackground(canvas, video, 18, 15, false);
      this.buttonActivate(change);
      requestAnimationFrame(this.draw());
    };

    this.execute = async () => {
      //await this.GetDevices();
      //await this.loadVideo();
      requestAnimationFrame(await this.draw);
    };

    //Events (Click)
    btnBlur.addEventListener("click", async (e) => {
      if (estadoBlur == 0)
      {
        estadoBlur = 1;
        change = 2;
        videoReal.srcObject = streamCanva;
        await this.execute();
      }
      else
      {
        estadoBlur = 0;
        videoReal.srcObject = streamVideo;
        await this.loadVideo();
      }
    });

    btnVirtualBackground.addEventListener("click", async (e) => {
      if (estadoBackground == 0)
      {
        estadoBackground = 1;
        change = 1;
        videoReal.srcObject = streamCanva;
        await this.execute();
      }
      else
      {
        estadoBackground = 0;
        videoReal.srcObject = streamVideo;
        await this.loadVideo();
      }
    });

    btnPermissions.addEventListener("click", async (e) => {
      await this.GetDevices();
      await this.loadVideo();
    });


    //test benchmark
    this.BenchmarkPerformance = async () => {
      let t0 = performance.now();
      await this.blurBackground(canvas, video, 18, 15, false);
      let t1 = performance.now();
      console.log(`Rendimiento del Blur: ${t1 - t0}ms`);
    }
  }
  });