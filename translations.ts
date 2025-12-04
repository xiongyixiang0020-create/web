import { Language } from './types';

export const translations = {
  zh: {
    appTitle: "TechVisual AI",
    poweredBy: "基于 Gemini 2.5 Flash",
    tabGenerate: "文生图",
    tabWatermark: "一键去水印",
    tabEnhance: "一键去马赛克",
    
    // Generate Mode
    promptLabel: "画面描述",
    promptPlaceholder: "描述你想生成的科技感画面...",
    generateBtn: "立即生成",
    generatingBtn: "生成中...",
    aspectRatio: "图片比例",
    ratioSquare: "方形",
    ratioLandscape: "横屏",
    ratioPortrait: "竖屏",
    ratioStandard: "标准",
    ratioTall: "高耸",
    
    // Image Processing General
    uploadLabel: "上传图片",
    uploadDesc: "拖拽图片到这里，或点击上传",
    uploadSubDesc: "支持 JPG, PNG 格式",
    
    // Enhance Mode (De-mosaic)
    enhanceBtn: "立即修复",
    enhancingBtn: "修复中...",
    enhancePrompt: "请对这张图片进行画质修复，去除马赛克和噪点，锐化细节，提升清晰度，保持高清画质。",

    // Watermark Mode
    watermarkBtn: "一键去水印",
    watermarkingBtn: "处理中...",
    watermarkPrompt: "请帮我去除这张图片里的所有水印、Logo和不需要的文字，自动智能填充背景，做到无痕修复，保持原图画质清晰。",
    
    // Result
    resultPlaceholder: "生成的视觉图将展示在这里",
    resultPreview: "高清预览",
    download: "下载高清原图",
    share: "分享",
    failed: "生成失败",
    
    // Header
    heroTitle1: "打造震撼的",
    heroTitle2: "科技视觉",
    heroDesc: "利用 Gemini AI 的力量，将您的创意转化为专业的 B 端主视觉、UI 样机和数字艺术。",
    
    // Default Prompt
    defaultPrompt: `图片整体【呈现科技蓝白色调)
背景是【浅蓝色渐变与流动的线条纹理,营造出简洁的数字科技氛围】。
画面右侧【有白色磨砂质感的云,后边围绕半透明屏幕,浅蓝色渐变且有数据图表分析，点缀(对话框、有数字A1、有搜索图标、有笔),内部有白色箭头符号,周围环绕着蓝色箭头和几何图形元素】。
画面左侧【有黑色文字,B端主视觉,AI绘画主视觉,配有蓝色“立即关注”按钮】比例21:9`
  },
  en: {
    appTitle: "TechVisual AI",
    poweredBy: "Powered by Gemini 2.5 Flash",
    tabGenerate: "Text to Image",
    tabWatermark: "Remove Watermark",
    tabEnhance: "De-mosaic",
    
    // Generate Mode
    promptLabel: "Image Description",
    promptPlaceholder: "Describe the tech visual you want...",
    generateBtn: "Generate Visual",
    generatingBtn: "Generating...",
    aspectRatio: "Aspect Ratio",
    ratioSquare: "Square",
    ratioLandscape: "Landscape",
    ratioPortrait: "Portrait",
    ratioStandard: "Standard",
    ratioTall: "Tall",
    
    // Image Processing General
    uploadLabel: "Upload Image",
    uploadDesc: "Drag & drop image here, or click to select",
    uploadSubDesc: "Supports JPG, PNG",
    
    // Enhance Mode
    enhanceBtn: "Restore Image",
    enhancingBtn: "Restoring...",
    enhancePrompt: "High quality image restoration, remove mosaic, de-pixelate, sharpen details, clear image, 4k resolution, photorealistic.",

    // Watermark Mode
    watermarkBtn: "Remove Watermark",
    watermarkingBtn: "Processing...",
    watermarkPrompt: "Please remove all watermarks, logos, and unwanted text from this image. Automatically fill the background seamlessly to make it look invisible. Maintain high image quality.",
    
    // Result
    resultPlaceholder: "Your generated visual will appear here",
    resultPreview: "High-resolution preview",
    download: "Download High Res",
    share: "Share",
    failed: "Generation Failed",
    
    // Header
    heroTitle1: "Create Stunning",
    heroTitle2: "Tech Visuals",
    heroDesc: "Transform your ideas into professional B-side main visuals, UI mockups, and digital art with the power of Gemini AI.",
    
    // Default Prompt (English version of the specific Chinese prompt)
    defaultPrompt: "Overall image presents a tech blue and white tone. Background features light blue gradients and flowing line textures, creating a simple digital tech atmosphere. Right side has white frosted glass clouds, surrounded by semi-transparent screens with data chart analysis, embellished with dialog boxes, number A1, search icons, and a pen. Inside there are white arrow symbols, surrounded by blue arrows and geometric elements. Left side has black text, B-side main visual, AI painting main visual, equipped with a blue 'Follow Now' button. Ratio 21:9."
  }
};
