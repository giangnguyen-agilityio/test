// Libraries
import React, { memo } from 'react'
import { Box, Flex, Image, Text, Button, Heading } from '@chakra-ui/react'
import { HeroImageProps, HeroDetailProps, HeroProps } from '@types'
import { Link } from 'react-router-dom'

// HeroImage Component
const HeroImage: React.FC<HeroImageProps> = ({
  imageUrl,
  imageExtraSmallUrl,
  imageSmallUrl,
  imageMediumUrl,
  imageLargeUrl,
}) => {
  return (
    <Box
      className="hero-image-wrapper"
      paddingTop={{ base: '60px', xl: '0' }}
      height={{ base: '436px', md: '915px', xl: '600px' }}
      paddingRight={{ base: 0, xl: '30px' }}
    >
      <Image
        srcSet={`${imageExtraSmallUrl} 320w, ${imageSmallUrl} 480w, ${imageMediumUrl} 768w, ${imageLargeUrl} 992w, ${imageUrl} 1280w`}
        sizes="(max-width: 480px) 320px, (max-width: 768px) 480px, (max-width: 992px) 768px, (max-width: 1280px) 992px, 1280px"
        src={imageUrl}
        alt="This is the image of the hero section"
        className="hero-image"
        width={{ base: 'full', xl: '410px' }}
        height={{ base: '452px', md: '931px', xl: '606px' }}
        objectFit="cover"
        boxShadow="default"
      />
    </Box>
  )
}

// HeroDetail Component
const HeroDetail: React.FC<HeroDetailProps> = ({
  title,
  description,
  buttonHref,
}) => {
  return (
    <Flex
      className="hero-detail"
      color="textPrimary"
      width={{ xl: '470px' }}
      padding={{ base: 0, xl: '50px 0 50px 50px' }}
      flexDirection="column"
      justifyContent={{ xl: 'center' }}
    >
      {/* Hero section title */}
      <Heading
        as="h2"
        className="hero-title"
        fontFamily="Oswald-Regular"
        fontWeight="semibold"
        fontSize={{ base: 'huge', md: 'mega', xl: 'ultra' }}
      >
        {title}
      </Heading>
      {/* Hero section description */}
      <Text
        className="hero-description"
        margin="30px 0"
        fontSize={{ base: 'regular', xl: 'extraSmall' }}
        fontStyle="italic"
        lineHeight="base"
      >
        {description}
      </Text>
      {/* Learn more button */}
      <Button
        as={Link}
        to={buttonHref}
        className="hero-btn"
        aria-label="Learn More Button"
        width={{ base: '210px', xl: '200px' }}
        letterSpacing={1}
        padding={{ base: '18px 57px 19px', md: '21px 55px 21px' }}
        borderRadius="medium"
        fontFamily="OpenSans-Semibold"
        height={{ base: 'full', xl: '62px' }}
        variant="primary"
      >
        Learn more
      </Button>
    </Flex>
  )
}

// Hero Component
const Hero: React.FC<HeroProps> = ({
  imageUrl,
  imageExtraSmallUrl,
  imageSmallUrl,
  imageMediumUrl,
  imageLargeUrl,
  title,
  description,
  buttonHref,
}) => {
  return (
    <Flex
      as="section"
      className="hero-section"
      flexDirection="column"
      position="relative"
      paddingTop="68px"
      // The data for this width is calculated entirely from design.
      minHeight={{ base: '1120px', md: '1568px', xl: '834px' }}
      marginBottom="20px"
    >
      <Flex
        justifyContent="flex-end"
        marginBottom="185px"
        marginRight={{ base: '-10px', md: '-50px' }}
      >
        {/* Background element */}
        <Box
          bgColor="secondary"
          height={{ base: '197px', md: '220px' }}
          // The data for this width is calculated entirely from design.
          width={{
            base: 'calc(((100% - 340px) / 2) + 318px)',
            md: 'calc(((100% - 720px) / 2) + 520px)',
            xl: 'calc(((100% - 940px) / 2) + 520px)',
          }}
        />
      </Flex>
      <Flex
        justifyContent="flex-start"
        marginLeft={{ base: '-10px', md: '-50px' }}
      >
        {/* Background element */}
        <Box
          bgColor="secondary"
          height="197px"
          // The data for this width is calculated entirely from design.
          width={{
            base: 'calc(((100% - 340px) / 2) + 318px)',
            md: 'calc(((100% - 720px) / 2) + 520px)',
            xl: 'calc(((100% - 940px) / 2) + 520px)',
          }}
        />
      </Flex>
      <Flex
        className="hero-content"
        width={{ base: '340px', md: '720px', xl: '940px' }}
        height={{ xl: '600px' }}
        position="absolute"
        // The data for this width is calculated entirely from design.
        left={{
          base: 'calc(((100% - 340px) / 2))',
          md: 'calc(((100% - 720px) / 2))',
          xl: 'calc(((100% - 940px) / 2))',
        }}
        flexDirection={{ base: 'column-reverse', xl: 'row' }}
        padding="30px"
        borderWidth="1px"
        bgColor="textSecondary"
        marginTop="48px"
      >
        {/* The HeroImage component */}
        <HeroImage
          imageUrl={imageUrl}
          imageExtraSmallUrl={imageExtraSmallUrl}
          imageSmallUrl={imageSmallUrl}
          imageMediumUrl={imageMediumUrl}
          imageLargeUrl={imageLargeUrl}
        />
        {/* The HeroDetail component */}
        <HeroDetail
          title={title}
          description={description}
          buttonHref={buttonHref}
        />
      </Flex>
    </Flex>
  )
}

export default memo(Hero)
