import {
  Button, Center, CenterProps, HStack, Icon, Square, Text, VStack,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';

interface DropzoneProps extends CenterProps {
  guidance: string
  buttonText: string
  onSubmitFile(file: File): void
  onChangeFile(file: File): void
}

export const Dropzone = ({ guidance, buttonText, onSubmitFile, onChangeFile, ...rest }: DropzoneProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      onChangeFile(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files && e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setIsDragOver(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  return (
  <Center
    borderWidth="1px"
    borderRadius="lg"
    px="6"
    py="4"
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}
    backgroundColor={isDragOver ? 'gray.500' : 'bg.muted'}
    transition="background-color 0.3s ease"
    {...rest}
  >
    <VStack spacing="3">
        {file ? (
          <>
            <Square size="10" bg="bg.subtle" borderRadius="lg">
              <Icon as={FiUploadCloud} boxSize="5" color="fg.muted" />
            </Square>
            <VStack spacing="1">
              <Text textStyle="sm" color="fg.muted">
                {file.name}
              </Text>
              <Button
                variant="text"
                colorScheme="brand"
                size="sm"
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.click();
                  }
                }}
              >
                Change File
              </Button>
              <Button
                mt="6"
                variant="solid"
                onClick={() => {
                  onSubmitFile(file);
                  setFile(null);
                }}>
                  {buttonText}
                </Button>
            </VStack>
          </>
        ) : (
          <>
            <Square size="10" bg="bg.subtle" borderRadius="lg">
              <Icon as={FiUploadCloud} boxSize="5" color="fg.muted" onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.click();
                    }
                  }} />
            </Square>
            <VStack spacing="1">
              <HStack spacing="1" whiteSpace="nowrap">
                <Button
                  variant="text"
                  colorScheme="brand"
                  size="sm"
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.click();
                    }
                  }}
                >
                  Click to upload
                </Button>
                <Text textStyle="sm" color="fg.muted">
                  or drag and drop
                </Text>
              </HStack>
              <Text textStyle="xs" color="fg.muted">
                {guidance}
              </Text>
            </VStack>
          </>
        )}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileInputChange}
        />
      </VStack>
  </Center>);
};
