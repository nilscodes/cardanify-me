import * as React from "react"
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  FormControl,
  FormLabel,
  Container,
  extendTheme,
  Heading,
  Image as CImage,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react"
import { theme as proTheme } from '@chakra-ui/pro-theme'
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import "@fontsource/aldrich"
import "@fontsource/rajdhani/500.css"
import "@fontsource/permanent-marker"
import { Dropzone } from "./Dropzone"
import { type Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { canvasPreview } from "./canvasPreview"
import { Footer } from "./Footer"
import { FiCheck, FiCopy, FiDownload, FiRotateCcw } from "react-icons/fi"
import { createCircularImage } from "./logoGenerator"
import { makeCenteredPercentCrop, makePixelCropWithScale } from "./cropHelpers"
import { CropModal } from "./CropModal"

const theme = extendTheme(proTheme, {
  config: {
    initialColorMode: 'system',
  },
  colors: {
    brand: {"50":"#FFC42D","100":"#ffc42d","200":"#ffaa34","300":"#ff913b","400":"#ff7842","500":"#ff5f49","600":"#ff4650","700":"#ff2d57","800":"#ff145f","900":"#FF145F"}
  },
  fonts: {
    heading: 'Aldrich',
    body: 'Rajdhani',
  },
  styles: {
    global: {
      "*::placeholder": {
        opacity: 1,
        color: "chakra-placeholder-color"
      },
      "*, *::before, &::after": {
        borderColor: "chakra-border-color",
      },
    }
  }
})

export const App = () => {
  const [processedImage, setProcessedImage] = React.useState<any>(null);
  const [preCropImage, setPreCropImage] = React.useState<any>(null);
  const [cropActive, setCropActive] = React.useState(false);
  const [hasCopied, setHasCopied] = React.useState(false);
  const initialRef = React.useRef<HTMLInputElement | null>(null);
  const cropRef = React.useRef<HTMLImageElement | null>(null);
  const [randomLogo] = React.useState(`logo512_${Math.floor(Math.random() * 6)}.png`);
  const [crop, setCrop] = React.useState<Crop>({
    unit: '%',
    width: 100,
    height: 100,
    x: 0,
    y: 0
  });

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();

      img.src = reader.result as string;
      img.onload = () => {
        const percentCrop = makeCenteredPercentCrop(img);
        setCrop(percentCrop);
        setCropActive(true);
        setPreCropImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const reset = () => {
    setProcessedImage(null);
    setHasCopied(false);
  }

  const onClose = () => {
    setCropActive(false);
    setProcessedImage(null);
  }

  const finishCardanify = () => {
    const img = new Image();
    img.src = preCropImage;
    img.onload = () => {
      if (cropRef.current === null) return;
      const pixelCrop = makePixelCropWithScale(img, cropRef.current, crop);
      const postCropImage = canvasPreview(img, pixelCrop);
      createCircularImage(postCropImage, (dataUrl: string) => setProcessedImage(dataUrl));
      setCropActive(false);
    }
  }

  const copyToClipboard = async () => {
    const res = await fetch(processedImage)
    const blob = await res.blob();
    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    setHasCopied(true);
    window.setTimeout(() => setHasCopied(false), 5000);
  };

  const downloadImage = () => {
    const image = processedImage.replace("image/png", "image/octet-stream");
    const link = document.createElement('a');
    link.download = `${new Date().toISOString().substring(0, 19).replace('T', '_')}-cardanify-me.png`;
    link.href = image;
    link.click();
  };

  return (<ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={{ base: 1, lg: 3 }} mt={{ base: 2, lg: 12}}>
        <VStack spacing={{ base: 4, lg: 8 }} >
          {processedImage && <>
            <Heading fontFamily="Permanent Marker" fontSize='3em' fontWeight='normal'>3. You are cardanified!</Heading>
            <CImage src={processedImage} alt="Cardanified" maxW={{ lg: '600px', base: '80vw' }} margin="5" />
            <VStack spacing={0}>
              <Heading fontFamily="Permanent Marker" fontSize='2em' fontWeight='normal'>4. Share!</Heading>
              <Text color="fg.muted" fontSize="0.75em">Use the hashtag #CardanifyMe</Text>
            </VStack>
            <Stack direction={{ base: 'column', lg: 'row' }}>
              <Button leftIcon={hasCopied ? <FiCheck /> : <FiCopy />} onClick={copyToClipboard}
              transition="background-color 0.3s">
                {hasCopied ? 'Copied!' : 'Copy to Clipboard'}
              </Button>
              <Button leftIcon={<FiDownload />} onClick={downloadImage} variant="outline">
                Download Image
              </Button>
              <Button leftIcon={<FiRotateCcw />} onClick={() => reset()} variant="outline" ml={{ base: 0, 'lg': 12 }}>Do it again</Button>
              <ColorModeSwitcher />
            </Stack>
          </>}
          {!processedImage && <>
            <Heading>Cardanify Me</Heading>
            <CImage h={{ base: '70vmin', lg: '40vmin' }} pointerEvents="none" src={randomLogo} />
            <Container maxW="xl">
              <FormControl id="file">
                <FormLabel fontFamily="Permanent Marker" fontSize='2em' fontWeight='normal'>1. Upload your file</FormLabel>
                <Dropzone guidance="PNG, SVG, JPG or GIF up to 2MB" buttonText="Cardanify Me!" onSubmitFile={handleImageChange} onChangeFile={handleImageChange} />
              </FormControl>
            </Container>
            <ColorModeSwitcher />
          </>}
        </VStack>
        <Footer />
      </Grid>
      <CropModal cropActive={cropActive} onClose={onClose} initialRef={initialRef} crop={crop} setCrop={setCrop} preCropImage={preCropImage} cropRef={cropRef} finishCardanify={finishCardanify} />
    </Box>
  </ChakraProvider>);
}
