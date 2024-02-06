import {
  VStack,
  Image as CImage,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import ReactCrop, { type Crop } from 'react-image-crop'

type CropModalProps = {
  cropActive: boolean;
  onClose: () => void;
  initialRef: React.RefObject<HTMLInputElement>;
  crop: Crop
  setCrop: (c: Crop) => void;
  preCropImage: string;
  cropRef: React.RefObject<HTMLImageElement>;
  finishCardanify: () => void;
}

export const CropModal = ({ cropActive, onClose, initialRef, crop, setCrop, preCropImage, cropRef, finishCardanify }: CropModalProps) => {
  return (<Modal isOpen={cropActive} onClose={onClose} isCentered size="5xl" initialFocusRef={initialRef}>
    <ModalOverlay />
    <ModalContent bg="bg.subtle">
      <ModalHeader fontFamily="Permanent Marker" fontSize='2em' fontWeight='normal'>2. Choose your circle</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <VStack>
          <ReactCrop crop={crop} onChange={c => setCrop(c)} circularCrop aspect={1}>
            <CImage src={preCropImage} alt="Crop me" ref={cropRef} />
          </ReactCrop>              
        </VStack>
      </ModalBody>

      <ModalFooter>
        <Button mr={3} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="solid" onClick={finishCardanify}>Let's go!</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>);
}