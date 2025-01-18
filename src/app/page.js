"use client";

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed } from 'lucide-react';
import CodeDisplay from "@/components/code-syntax";

const defaultDesktopImage = "https://content.abt.com/media/images/homepage/slideshow/011325_KitchenAid.jpg";
const defaultMobileImage = "https://content.abt.com/media/images/homepage/slideshow/011325_KitchenAid_Mobile.jpg";

export default function BannerEditor() {
  const presetButtons = {
    blueFill: {buttonBackground: '#1C70BF', buttonBorder: '#1C70BF', buttonTextColor: '#FFF'},
    blueOutline: {buttonBackground: '#FFF', buttonBorder: '#1C70BF', buttonTextColor: '#1C70BF'},
    blackFill: {buttonBackground: '#000', buttonBorder: '#000', buttonTextColor: '#FFF'},
    blackOutline: {buttonBackground: '#FFF', buttonBorder: '#000', buttonTextColor: '#000'},
    whiteFillBlueText: {buttonBackground: '#FFF', buttonBorder: '#FFF', buttonTextColor: '#1C70BF'},
  }

  const [settings, setSettings] = useState({
    desktopImage: defaultDesktopImage,
    mobileImage: defaultMobileImage,
    header: "Header Text",
    subheader: "Subheader Text Subheader Text Subheader Text - Subheader Text",
    buttonText: "SHOP NOW",
    verticalAlign: "middle",
    horizontalAlign: "center",
    buttonTextColor: "#FFF",
    buttonBackground: "#1C70BF",
    buttonBorder: "#1C70BF",
    textPosition: "left",
    parentClass: "hm_slide_1",
    dataTrackCategory: 'Homepage Banners',
    dataTrackLabel: '20250113_kitchenaid',
    bannerUrl: 'https://www.abt.com/',
    containerWidth: "50%",
    headerFontSize: "3.5vw",
    headerLineHeight: "3.6vw",
    headerFontColor: "#000",
    subheaderFontSize: "1.6vw",
    subheaderLineHeight: "1.7vw",
    subheaderFontColor: "#000",
    paddingTop: "6.5vw",
    paddingBottom: "2vw",
    paddingLeft: "2vw",
    paddingRight: "2vw",
  });

  const [widthPreview, setWidthPreview] = useState(0);
  const [markup, setMarkup] = useState(null);

  const toggleWidthPreview = () => {
    setWidthPreview((prev) => !prev);
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const getPositionClasses = () => {
    const classes = [
      `${settings.textPosition}_position`,
      `${settings.horizontalAlign}_justified`,
      `${settings.verticalAlign}_justified`
    ];
    return classes.join(' ');
  };


  const setButtonStyles = (preset) => {
    const { buttonBackground, buttonBorder, buttonTextColor } = presetButtons[preset];
    updateSetting('buttonBackground', buttonBackground);
    updateSetting('buttonBorder', buttonBorder);
    updateSetting('buttonTextColor', buttonTextColor);
  };


  // const generateHTML = () => {}
  const generateHTML = () => {
    const html = `
<style>
.${settings.parentClass}.slideshow_container {position: relative;line-height: 0;overflow: hidden;}
.${settings.parentClass} .slideshow_text_container {position: absolute;height: 100%;width: ${settings.containerWidth};display: flex;justify-content: ${settings.verticalAlign};flex-direction: column;padding-top: ${settings.paddingTop};padding-bottom: ${settings.paddingBottom};padding-left: ${settings.paddingLeft};padding-right: ${settings.paddingRight};}
.${settings.parentClass} .slideshow_text_container.top_justified { justify-content: flex-start; }
.${settings.parentClass} .slideshow_text_container.middle_justified { justify-content: center; }
.${settings.parentClass} .slideshow_text_container.bottom_justified { justify-content: flex-end; }
.${settings.parentClass} .slideshow_text_container.left_justified { text-align: left; }
.${settings.parentClass} .slideshow_text_container.right_justified { text-align: right; }
.${settings.parentClass} .slideshow_text_container.center_justified { text-align: center; }
.${settings.parentClass} .slideshow_text_container.left_position { top: 0; left: 0; }
.${settings.parentClass} .slideshow_text_container.right_position { top: 0; right: 0; }
.${settings.parentClass} .slideshow_text_container .slideshow_header {color: ${settings.headerFontColor};font-size: ${settings.headerFontSize};font-weight: normal;line-height: ${settings.headerLineHeight};}
.${settings.parentClass} .slideshow_text_container .slideshow_subheader {color: ${settings.subheaderFontColor};font-size: ${settings.subheaderFontSize};font-weight: normal;line-height: ${settings.subheaderLineHeight};}
.${settings.parentClass} .slideshow_button {color: ${settings.buttonTextColor};background: ${settings.buttonBackground};border: 2px solid ${settings.buttonBorder};}
.${settings.parentClass} .slideshow_button:hover {background: ${settings.buttonTextColor};color: ${settings.buttonBackground};border: 2px solid ${settings.buttonBorder}}
.${settings.parentClass} .slideshow_button_container { margin: 20px 0 0 0; }
.${settings.parentClass} .slideshow_button {width: auto;display: inline-block;padding: .7em 2em .6em;height: auto;line-height: 1;font-size: 1vw;}
.${settings.parentClass} .slideshow_button.plain_button {font-weight: bold;}

@media screen and (min-width: 1660px) {
  .${settings.parentClass} .slideshow_text_container { padding: 20px; }
  .${settings.parentClass} .slideshow_text_container .slideshow_button {width: auto;height: 42px;padding: 0 30px;line-height: 40px;font-size: 16px;}
  .${settings.parentClass}  {font-size: 40px;line-height: 40px;}
  .${settings.parentClass} .slideshow_text_container .slideshow_subheader {font-size: 24px;line-height: 24px;}
}

@media screen and (max-width: 768px) {
  .${settings.parentClass} .slideshow_text_container {position: relative;text-align: center;width: 100% !important;padding: 0px !important;margin: 15px 0 0 0;overflow: hidden;text-align: center !important;}
  .${settings.parentClass} .slideshow_button_container { display: none; }
  .${settings.parentClass} .slideshow_text_container .slideshow_header {font-size: 4vw !important;line-height: 4.1vw !important;text-overflow: ellipsis;overflow: hidden;max-height: 30px;-webkit-line-clamp: 1;display: -webkit-box;-webkit-box-orient: vertical;color: #000 !important;}
  .${settings.parentClass} .slideshow_text_container .slideshow_subheader {font-size: 2.5vw !important;line-height: 2.6vw !important;text-overflow: ellipsis;overflow: hidden;max-height: 20px;-webkit-line-clamp: 1;display: -webkit-box;-webkit-box-orient: vertical;color: #000 !important;}
}
</style>

<div class="slideshow_container ${settings.parentClass}">
  <a href="${settings.bannerUrl}" data-track-category="${settings.dataTrackCategory}" data-track-label="${settings.dataTrackLabel}">
    <picture>
      <source media="(max-width: 768px)" srcset="${settings.mobileImage}">
      <source srcset="${settings.desktopImage}">
      <img src="${settings.desktopImage}" width="1900" height="530" alt="" style="width: 100%; height: auto" />
    </picture>
    <div class="slideshow_text_container ${getPositionClasses()}" style="width:${settings.containerWidth}">
      <div class="slideshow_header">${settings.header}</div>
      <div class="slideshow_subheader">${settings.subheader}</div>
      <div class="slideshow_button_container">
        <div class="slideshow_button plain_button">${settings.buttonText}</div>
      </div>
    </div>
  </a>
</div>
`;

    setMarkup(html)
  };

  return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="mx-auto grid grid-cols-1 gap-8">
          {/* Editor Controls */}
          {/* Preview */}
          <div className="col-span-1">
            <div className="slideshow_container">
              <a href={`${settings.bannerUrl}`} data-track-category={`${settings.dataTrackCategory}`} data-track-label={`${settings.dataTrackLabel}`}>
                <picture>
                  <source media="(max-width: 768px)" srcSet={settings.mobileImage}/>
                  <source srcSet={settings.desktopImage}/>
                  <img src={settings.desktopImage} width="1900" height="530" alt=""
                       style={{width: '100%', height: 'auto'}}/>
                </picture>
                <div className={`slideshow_text_container ${getPositionClasses()} ${widthPreview ? 'show-width-preview' : ''}`}
                     style={{
                       width: settings.containerWidth,
                       paddingTop: settings.paddingTop,
                       paddingBottom: settings.paddingBottom,
                       paddingLeft: settings.paddingLeft,
                       paddingRight: settings.paddingRight,
                    }}>
                  <div className="slideshow_header"
                     style={{
                      color: settings.headerFontColor,
                      fontSize: settings.headerFontSize,
                      lineHeight: settings.headerLineHeight,
                  }}>
                    {settings.header}
                  </div>
                  <div className="slideshow_subheader"
                       style={{
                         color: settings.subheaderFontColor,
                         fontSize: settings.subheaderFontSize,
                         lineHeight: settings.subheaderLineHeight,
                       }}>
                    {settings.subheader}
                  </div>
                  <div className="slideshow_button_container">
                    <div className={`slideshow_button plain_button`}
                         style={{
                           color: settings.buttonTextColor,
                           background: settings.buttonBackground,
                           border: '2px solid ' + settings.buttonBorder,
                         }}>
                      {settings.buttonText}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>


          <div className="bg-white p-6 rounded-lg shadow relative">
            <span className='font-bold flex gap-4 items-center justify-end absolute right-6 w-[500px]'>
              Container Width
              <Input className='bg-white w-[65px]'
                     value={settings.containerWidth}
                     onChange={(e) => updateSetting('containerWidth', e.target.value)}
              />
              <Button size={'sm'} variant={'ghost'} onClick={() => toggleWidthPreview()}>
                {widthPreview ? (
                    <EyeClosed />
                ) : (
                    <Eye />
                )}
              </Button>

              <Button size={'sm'} onClick={generateHTML} className="">
                Generate HTML
              </Button>

            </span>
            <div className="space-y-4">
              <h3 className="mt-0 scroll-m-20 text-2xl font-semibold tracking-tight">
                Image
              </h3>
              <div className='grid grid-cols-12 space-x-4 bg-gray-50 p-8 rounded-sm'>
                <div className="col-span-2 space-y-4">
                  <Label className='font-bold'
                  >Desktop Image URL</Label>
                  <Input className='bg-white'

                         value={settings.desktopImage}
                         onChange={(e) => updateSetting('desktopImage', e.target.value)}
                  />
                </div>
                <div className="col-span-2 space-y-4">
                  <Label className='font-bold'
                  >Mobile Image URL</Label>
                  <Input className='bg-white'
                         value={settings.mobileImage}
                         onChange={(e) => updateSetting('mobileImage', e.target.value)}
                  />
                </div>

                <div className="col-span-2 space-y-4">
                  <Label className='font-bold'>Link</Label>
                  <Input className='bg-white'
                         value={settings.bannerUrl}
                         onChange={(e) => updateSetting('bannerUrl', e.target.value)}
                  />
                </div>

                <div className="col-span-2 space-y-4">
                  <Label className='font-bold'>Parent Class</Label>
                  <Input className='bg-white'

                         value={settings.parentClass}
                         onChange={(e) => updateSetting('parentClass', e.target.value)}
                  />
                </div>

                <div className="col-span-2 space-y-4">
                  <Label className='font-bold'>Tracking Category</Label>
                  <Input className='bg-white'
                         value={settings.dataTrackCategory}
                         onChange={(e) => updateSetting('dataTrackCategory', e.target.value)}
                  />
                </div>
                <div className="col-span-2 space-y-4">
                  <Label className='font-bold'>Tracking Label</Label>
                  <Input className='bg-white'
                         value={settings.dataTrackLabel}
                         onChange={(e) => updateSetting('dataTrackLabel', e.target.value)}
                  />
                </div>
                {/*</div>*/}

              </div>

              <h3 className="mt-0 scroll-m-20 text-2xl font-semibold tracking-tight">
                Text
              </h3>
              <div className='grid grid-cols-2 space-x-4 bg-gray-50 p-8 pt-0 rounded-sm'>
                <div className='grid col-span-1 space-x-4'>
                  <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                    Header
                  </h3>
                  <div className='grid grid-cols-12 space-x-4 bg-gray-50 rounded-sm'>
                    <div className="col-span-3 space-y-4">
                      <Label className='font-bold'>Text</Label>
                      <Input className='bg-white'
                             value={settings.header}
                             onChange={(e) => updateSetting('header', e.target.value)}
                      />
                    </div>
                    <div className="col-span-3 space-y-4">
                      <Label className='font-bold'>Size </Label>
                      <Input className='bg-white'
                             value={settings.headerFontSize}
                             onChange={(e) => updateSetting('headerFontSize', e.target.value)}
                      />
                    </div>
                    <div className="col-span-3 space-y-4">
                      <Label className='font-bold'>Line Height </Label>
                      <Input className='bg-white'
                             value={settings.headerLineHeight}
                             onChange={(e) => updateSetting('headerLineHeight', e.target.value)}
                      />
                    </div>
                    <div className="col-span-3 space-y-4">
                      <Label className='font-bold'>Color </Label>
                      <Input className='bg-white'
                             value={settings.headerFontColor}
                             onChange={(e) => updateSetting('headerFontColor', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className='grid col-span-1 space-x-4'>
                  <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                    Subheader
                  </h3>
                  <div className='grid grid-cols-12 space-x-4 bg-gray-50 rounded-sm'>
                    <div className="col-span-3 space-y-4">
                      <Label className='font-bold'>Text</Label>
                      <Input className='bg-white'
                             value={settings.subheader}
                             onChange={(e) => updateSetting('subheader', e.target.value)}
                      />
                    </div>

                    <div className="col-span-3 space-y-4">
                      <Label className='font-bold'>Size </Label>
                      <Input className='bg-white'
                             value={settings.subheaderFontSize}
                             onChange={(e) => updateSetting('subheaderFontSize', e.target.value)}
                      />
                    </div>
                    <div className="col-span-3 space-y-4">
                      <Label className='font-bold'>Line Height </Label>
                      <Input className='bg-white'
                             value={settings.subheaderLineHeight}
                             onChange={(e) => updateSetting('subheaderLineHeight', e.target.value)}
                      />
                    </div>


                    <div className="col-span-3 space-y-4">
                      <Label className='font-bold'>Color </Label>
                      <Input className='bg-white'
                             value={settings.subheaderFontColor}
                             onChange={(e) => updateSetting('subheaderFontColor', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>


              {/* ---------------------------------------------------------------- */}


              {/* ---------------------------------------------------------------- */}

              <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                Container
              </h3>
              <div className='grid grid-cols-12 space-x-4 bg-gray-50 p-8 rounded-sm'>
                <div className="col-span-2 space-y-4">
                  <Label className='font-bold'>Padding top</Label>
                  <Input className='bg-white'
                         value={settings.paddingTop}
                         onChange={(e) => updateSetting('paddingTop', e.target.value)}
                  />
                </div>

                <div className="col-span-2 space-y-4">
                  <Label className='font-bold'>Padding Bottom</Label>
                  <Input className='bg-white'
                         value={settings.paddingBottom}
                         onChange={(e) => updateSetting('paddingBottom', e.target.value)}
                  />
                </div>

                <div className="col-span-2 space-y-4">
                  <Label className='font-bold'>
                    Padding Right
                  </Label>
                  <Input className='bg-white'
                         value={settings.paddingRight}
                         onChange={(e) => updateSetting('paddingRight', e.target.value)}
                  />
                </div>

                <div className="col-span-2 space-y-4">
                  <Label className='font-bold'>
                    Padding left
                  </Label>
                  <Input className='bg-white'
                         value={settings.paddingLeft}
                         onChange={(e) => updateSetting('paddingLeft', e.target.value)}
                  />
                </div>


                <div className="col-span-1 space-y-4">
                  <Label className='font-bold'>Vertical</Label>
                  <Select className='bg-white'
                      value={settings.verticalAlign}
                      onValueChange={(value) => updateSetting('verticalAlign', value)}
                  >
                    <SelectTrigger className='bg-white'>
                      <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top">Top</SelectItem>
                      <SelectItem value="middle">Middle</SelectItem>
                      <SelectItem value="bottom">Bottom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-1 space-y-4">
                  <Label className='font-bold'>Horizontal</Label>
                  <Select
                      value={settings.horizontalAlign}
                      onValueChange={(value) => updateSetting('horizontalAlign', value)}
                  >
                    <SelectTrigger className='bg-white'>
                      <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-1 space-y-4">
                  <Label className='font-bold'>Text</Label>
                  <Select
                      value={settings.textPosition}
                      onValueChange={(value) => updateSetting('textPosition', value)}
                  >
                    <SelectTrigger className='bg-white'>
                      <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

              </div>

              <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                Button
              </h3>
              <div className='grid grid-cols-10 space-x-4 bg-gray-50 p-8 rounded-sm'>
                <div className="col-span-2 space-y-4">
                  <Label className='font-bold'>Button Text</Label>
                  <Input className='bg-white'
                         value={settings.buttonText}
                         onChange={(e) => updateSetting('buttonText', e.target.value)}
                  />
                </div>

                <div className="col-span-2 space-y-4">
                  <Label className='font-bold'>Button Background </Label>
                  <Input className='bg-white'
                         value={settings.buttonBackground}
                         onChange={(e) => updateSetting('buttonBackground', e.target.value)}
                  />
                </div>


                <div className="col-span-2 space-y-4">
                  <Label className='font-bold'>Button Text </Label>
                  <Input className='bg-white'
                         value={settings.buttonTextColor}
                         onChange={(e) => updateSetting('buttonTextColor', e.target.value)}
                  />
                </div>

                <div className="col-span-2 space-y-4">
                  <Label className='font-bold'>Button Border </Label>
                  <Input className='bg-white'
                         value={settings.buttonBorder}
                         onChange={(e) => updateSetting('buttonBorder', e.target.value)}
                  />
                </div>

              </div>


              <div className="flex gap-2 bg-gray-50 p-4 rounded-sm">
                <button onClick={() => setButtonStyles('blueFill')} className={`slideshow_button plain_button`}
                        style={{
                          color: '#FFF',
                          background: '#1C70BF',
                          border: '2px solid #1C70BF',
                        }}>
                  {settings.buttonText}
                </button>

                <button onClick={() => setButtonStyles('blueOutline')} className={`slideshow_button plain_button`}
                        style={{
                          color: '#1C70BF',
                          background: '#FFF',
                          border: '2px solid #1C70BF',
                        }}>
                  {settings.buttonText}
                </button>

                <button onClick={() => setButtonStyles('blackFill')} className={`slideshow_button plain_button`}
                        style={{
                          color: '#FFF',
                          background: '#000',
                          border: '2px solid #000',
                        }}>
                  {settings.buttonText}
                </button>

                <button onClick={() => setButtonStyles('blackOutline')} className={`slideshow_button plain_button`}
                        style={{
                          color: '#000',
                          background: '#FFF',
                          border: '2px solid #000',
                        }}>
                  {settings.buttonText}
                </button>
                <button onClick={() => setButtonStyles('whiteFillBlueText')} className={`slideshow_button plain_button`}
                        style={{
                          color: '#1C70BF',
                          background: '#FFF',
                          border: '2px solid #FFF',
                        }}>
                  {settings.buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
        <CodeDisplay markup={markup} />
      </div>


  );
}