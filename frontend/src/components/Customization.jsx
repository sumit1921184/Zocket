import React, { useState, useEffect, useRef } from "react";
import { ChromePicker } from "react-color";
import Canvas from "./Canva";

const AdCustomization = () => {
  const initialData = {
    caption: {
      text: "1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs",
      position: { x: 50, y: 50 },
      max_characters_per_line: 31,
      font_size: 44,
      alignment: "left",
      text_color: "#FFFFFF",
    },
    cta: {
      text: "Shop Now",
      position: { x: 190, y: 320 },
      text_color: "#FFFFFF",
      background_color: "#000000",
    },
    image_mask: {
      x: 56,
      y: 442,
      width: 970,
      height: 600,
    },
    urls: {
      mask: "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_mask.png?random=12345",
      stroke:
        "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Mask_stroke.png?random=12345",
      design_pattern:
        "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Design_Pattern.png?random=12345",
    },
  };

  const defaultCoffeeImage =
    "https://img.freepik.com/free-photo/cup-coffee-with-heart-drawn-foam_1286-70.jpg?t=st=1714218266~exp=1714221866~hmac=c054219a6e358ca00d3e9b5620693fae0a71766891cbc324a3854b14d73a5b2c&w=740";

    const [ctaText, setCtaText] = useState(initialData.cta.text);
  const [imageSrc, setImageSrc] = useState(defaultCoffeeImage);
  const [backgroundColor, setBackgroundColor] = useState("#0369A1");
  const [adContent, setAdContent] = useState(initialData.caption.text);
 const [selectedColor, setSelectedColor] = useState("#000000");
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImageSrc(e.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (newColor) => {
    setSelectedColor(newColor.hex);
    setBackgroundColor(newColor.hex);
  };

  const handleAdContentChange = (event) => {
    setAdContent(event.target.value);
  };

  const handleCtaTextChange = (event) => {
    setCtaText(event.target.value);
  };

  return (
    <div className="ad-customization lg:flex lg:flex-row lg:justify-between md:flex md:flex-col sm:flex sm:flex-col ">
      <Canvas
        className="ad-canvas w-[40%] "
        image={imageSrc}
        backgroundColor={backgroundColor}
        adContent={adContent}
        cta={ctaText}
        strokeColor={selectedColor}
      />
      <div className="ad-options relative lg:w-[55%] lg:my-[0px] md:my-[100px] md:w-[80%] md:mx-auto sm:my-[80px] sm:w-[80%] sm:mx-auto">
        <button
          onClick={toggleVisibility}
          className="absolute top-[24px] right-[24px] rounded-full p-[6px] bg-gray-300 text-white transform translate-x-1/2 -translate-y-1/2"
        >
          {isVisible ? "✖️" : "➖"}
        </button>
        {isVisible && (
          <div className="mt-[30px]">
            <h1 className=" font-bold text-center text-[32px]">
              Ad Customization
            </h1>
            <p className="text-center text-gray-400 text-[22px] mb-[50px]">
              Customise your ad and get the templates accordingly
            </p>
            <div className=" border-[1px] p-[10px] rounded-[10px]  my-[10px] ">
              <label htmlFor="adImageUpload" className="icon-placeholder">
                {/* <AddPhotoAlternateIcon color="primary" sx={{ fontSize: 34 }} /> */}
                <p className=" inline-block">
                  Change the ad Creative image{"    "}
                  <span className=" underline text-blue-700 hover:cursor-pointer hover:text-blue-800">
                    {"  "} Select File
                  </span>
                </p>
              </label>
              <input
                id="adImageUpload"
                type="file"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            <div className="border-[1px] p-[10px] rounded-[10px]  my-[10px]">
              <p className=" text-gray-400 mb-[2px]">Ad content</p>
              <input
                type="text"
                className="rounded px-[10px] py-[10px] w-full"
                value={adContent}
                onChange={handleAdContentChange}
              />
            </div>
            <div className="border-[1px] p-[10px] rounded-[10px]  my-[20px]">
              <p className=" text-gray-400 mb-[2px]">CTA</p>
              <input
                type="text"
                className="rounded px-[10px] py-[10px] w-full"
                value={ctaText}
                onChange={handleCtaTextChange}
              />
            </div>
            <ColorPicker onSelectColor={handleColorChange} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdCustomization;

const ColorPicker = ({ onSelectColor }) => {
  const [color, setColor] = useState("#ffff");
  const [showPicker, setShowPicker] = useState(false);
  const [recentColors, setRecentColors] = useState([]);

  const handleColorChange = (newColor) => {
    const selectedColor = newColor.hex;
    setColor(selectedColor);
    onSelectColor(newColor);
    if (!recentColors.includes(selectedColor)) {
      setRecentColors((prevColors) => [
        selectedColor,
        ...prevColors.slice(0, 4),
      ]);
    }
  };

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const handleLastColorClick = (newColor) => {
    setColor(newColor);
    onSelectColor({ hex: newColor });
    setShowPicker(false);
  };

  return (
    <div className="color-picker relative">
      <p className="m-[10px] text-[18px] text-gray-400">Choose your color</p>
      {recentColors.length > 0 && (
        <div className="flex items-center">
          {recentColors.map((c, index) => (
            <div
              key={index}
              className="w-8 h-8 mx-1 cursor-pointer rounded-full"
              style={{ backgroundColor: c }}
              onClick={() => handleLastColorClick(c)}
            ></div>
          ))}
          <button
            onClick={togglePicker}
            className="ml-2 px-[6px] py-[6px] bg-gray-400 text-white rounded-full"
          >
            ➕
          </button>
        </div>
      )}

      {!showPicker && recentColors.length === 0 && (
        <button
          onClick={togglePicker}
          className="px-[6px] py-[6px] bg-gray-400 text-white rounded-full"
        >
          ➕
        </button>
      )}
      {showPicker && (
        <div className="absolute top-0 right-0 z-10">
          <ChromePicker color={color} onChange={handleColorChange} />
        </div>
      )}
    </div>
  );
};
