import { ButtonGroup, Container, IconButton, Image, Link, Stack, Text } from '@chakra-ui/react'
import { FaGithub, FaTwitter } from 'react-icons/fa'

export const Footer = () => (
  <Container as="footer" role="contentinfo" py={{ base: '4', md: '8' }}>
    <Stack spacing={{ base: '4', md: '5' }}>
      <Stack justify="space-between" direction="row" align="center">
      <Link href="https://vibrantnet.io" isExternal _hover={{ textDecoration: 'none' }}><Image src="/favicon.ico" h="48px" /></Link>
        <ButtonGroup variant="tertiary">
          <IconButton as="a" href="https://github.com/nilscodes/cardanify-me" aria-label="GitHub" icon={<FaGithub />} target="_blank" />
          <IconButton as="a" href="https://twitter.com/NilsCodes" aria-label="Twitter" icon={<FaTwitter />} target="_blank" />
        </ButtonGroup>
      </Stack>
      <Text fontSize="sm" color="fg.subtle">
        &copy; {new Date().getFullYear()} <Link href="https://vibrantnet.io" isExternal>Vibrant</Link> & <Link href="https://hazelpool.com" isExternal>HAZEL</Link>.
      </Text>
    </Stack>
  </Container>
)