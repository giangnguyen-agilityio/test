// Libraries
import React from 'react'
import { Flex, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

// Types
import { NavigationLink } from '@types'

// Desktop Navigation Component
const DesktopNavigation: React.FC<{ links: NavigationLink[] }> = ({
  links,
}) => (
  <Flex as="nav" className="navigation" paddingTop={1.5}>
    {/* List of navigation items */}
    <Flex as="ul" className="nav-list" gap={6}>
      {links.map(({ label, href }) => (
        <Flex as="li" className="nav-item" key={label}>
          <Button
            as={Link}
            to={href}
            aria-label={label}
            width="full"
            fontSize="small"
            textTransform="uppercase"
            color="textSecondary"
            variant="contract"
          >
            {label}
          </Button>
        </Flex>
      ))}
    </Flex>
  </Flex>
)

export default DesktopNavigation
