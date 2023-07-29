(() => {
  const script = document.currentScript;

  const ChatIcon = "https://res.cloudinary.com/musabcloud/image/upload/v1689488174/ascii/chat-float_eey6op.svg";
  const CloseIcon = "https://res.cloudinary.com/musabcloud/image/upload/v1689488174/ascii/exit-float_elviaf.svg";

  let widget;
  let iframe;
  let buttonChat;
  let voiceButton;
  // const widgetUrl = `https://bright-tiramisu-c37a9c.netlify.app/`;
  const voiceWidgetUrl = `http://localhost:3000/?voiceOnly=1`;
  const widgetUrl = `http://localhost:3000/`;

  const loadWidget = () => {
    //for chat widget
    widget = document.createElement("div");
    widget.id = "neura-chat-widget";

    iframe = document.createElement("iframe");
    iframe.id = "widget-iframe";
    iframe.allow = "microphone *"; // Allowing microphone access for the iframe

    widget.appendChild(iframe);
    iframe.addEventListener("load", () => {
      buttonChat.style.display = "block";
    });
    iframe.src = widgetUrl;
    document.body.appendChild(widget);

    //for voice widget
    widgetVoice = document.createElement("div");
    widgetVoice.id = "neura-chat-widget-voice";

    iframeVoice = document.createElement("iframe");
    iframeVoice.id = "widget-iframe-voice";
    iframeVoice.allow = "microphone *";

    widgetVoice.appendChild(iframeVoice);

    iframeVoice.addEventListener("load", () => {
      voiceButton.style.display = "block";
    });

    iframeVoice.src = voiceWidgetUrl;
    document.body.appendChild(widgetVoice);
  };

  const showWidget = () => {
    const btnVoice = voiceButton.querySelector("img");
    btnVoice.src = ChatIcon;
    const btnChatImg = buttonChat.querySelector("img");
    btnChatImg.src = CloseIcon;
    widgetVoice.style.display = "none";
    iframeVoice.style.display = "none";
    widget.style.display = "block";
    iframe.style.display = "block";
  };

  const hideWidget = () => {
    const btnVoice = voiceButton.querySelector("img");
    btnVoice.src = ChatIcon;
    const btnChatImg = buttonChat.querySelector("img");
    btnChatImg.src = ChatIcon;
    widget.style.display = "none";
    iframe.style.display = "none";
  };

  const showVoiceWidget = () => {
    const btnVoice = voiceButton.querySelector("img");
    btnVoice.src = CloseIcon;
    const btnChatImg = buttonChat.querySelector("img");
    btnChatImg.src = ChatIcon;
    widget.style.display = "none";
    iframe.style.display = "none";
    widgetVoice.style.display = "block";
    iframeVoice.style.display = "block";
  };

  const hideVoiceWidget = () => {
    const btnVoice = voiceButton.querySelector("img");
    btnVoice.src = ChatIcon;
    const btnChatImg = buttonChat.querySelector("img");
    btnChatImg.src = ChatIcon;
    widgetVoice.style.display = "none";
    iframeVoice.style.display = "none";
  };

  const isWidgetVisible = () => {
    return widget.style.display === "block";
  };
  const isVoiceWidgetVisible = () => {
    return widgetVoice.style.display === "block";
  };

  const toggleChatWidget = () => {
    hideVoiceWidget();
    if (!isWidgetVisible()) {
      showWidget();
    } else {
      hideWidget();
    }
  };

  const toggleVoiceWidget = () => {
    hideWidget();
    if (!isVoiceWidgetVisible()) {
      showVoiceWidget();
    } else {
      hideVoiceWidget();
    }
  };

  const createButton = () => {
    buttonChat = document.createElement("button");
    buttonChat.className = "widget-controller-btn";
    buttonChat.addEventListener("click", toggleChatWidget);
    buttonChat.style.display = "none";

    const img = document.createElement("img");
    img.width = "40px";
    img.src = ChatIcon;

    buttonChat.appendChild(img);

    document.body.appendChild(buttonChat);
  };

  const createVoiceButton = () => {
    voiceButton = document.createElement("button");
    voiceButton.className = "voice-controller-btn";
    voiceButton.addEventListener("click", toggleVoiceWidget);
    voiceButton.style.display = "none";

    const img = document.createElement("img");
    img.width = "40px";
    img.src = ChatIcon;

    voiceButton.appendChild(img);

    document.body.appendChild(voiceButton);
  };

  const createStyle = () => {
    const style = document.createElement("style");
    style.innerHTML = `
      #neura-chat-widget {
        display: none;
        box-sizing: border-box;
        width: 100%;
        max-width: 400px;
        height: calc(100% - 145px);
        max-height: 600px;
        position: fixed;
        bottom: 70px;
        right: 15px;
        padding: 0;
        z-index: 9999;
        border: 1px solid #e6e6e6;
        border-radius: 10px;
        box-shadow: 0 5px 40px rgba(0, 0, 0, .16) !important;
      }  
      #widget-iframe{
        box-sizing: border-box;
        position: absolute;
        right: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border: 0;
        margin: 0;
        padding: 0;
        background-color: none;
        display: none;
        border-radius: 10px;
        border: 1px solid #e6e6e6;
      }

      #neura-chat-widget-voice {
        display: none;
        box-sizing: border-box;
        width: 100%;
        max-width: 100vw;
        height:100vh;
        max-height: 100vh;
        position: fixed;
        bottom:0;
        right: 0;
        padding: 0;
        z-index: 9988;
      }  
      #widget-iframe-voice{
        box-sizing: border-box;
        position: absolute;
        right: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border: 0;
        margin: 0;
        padding: 0;
        background-color: none;
        display: none;
      }
      .widget-controller-btn {
        position: fixed;
        bottom: 15px;
        right: 15px;
        width: 90px;
        height: 40px;
        border-radius: 66.9656982421875px;
        background-color: #ffffff;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.18) !important;
        z-index: 2147483640;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
      }
    
      .widget-controller-btn img {
        height: 20px;
        width: 100%;
      }

      .voice-controller-btn {
        position: fixed;
        bottom: 15px;
        right: 105px;
        width: 90px;
        height: 40px;
        border-radius: 66.9656982421875px;
        background-color: #ffffff;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.18) !important;
        z-index: 9999;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
      }
    
      .voice-controller-btn img {
        height: 20px;
        width: 100%;
      }

      @media (max-width: 600px) {
        .widget-controller-btn {
          bottom: 5px;
          right: 10px;
        }
        #neura-chat-widget{
          right:0;
          top:0;
          left:0;
          height: calc(100vh - 50px) !important;
          max-height: 100vh !important;
          width: 100% !important;
 
        }
      }
    `;

    document.head.appendChild(style);
  };

  if (document.readyState === "complete") {
    loadWidget();
    createButton();
    createVoiceButton();
    createStyle();
  } else {
    document.addEventListener("readystatechange", () => {
      if (document.readyState === "complete") {
        loadWidget();
        createButton();
        createVoiceButton();
        createStyle();
      }
    });
  }
})();
