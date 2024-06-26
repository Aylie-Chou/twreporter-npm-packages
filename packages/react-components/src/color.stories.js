/* eslint react/display-name:0 */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  colorBrand,
  colorPhoto,
  colorGrayscale,
  colorPodcast,
  colorSupportive,
  colorOpacity,
  COLOR_SEMANTIC,
  COLOR_PINK_ARTICLE,
} from '@twreporter/core/lib/constants/color'
import { getRadioArg } from './storybook/utils/get-enum-arg'
import { P2 } from './text/paragraph'
// lodash
import map from 'lodash/map'
const _ = {
  map,
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.$background};
`

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Color = styled.div`
  height: ${(props) => props.$height};
  width: ${(props) => props.$width};
  background-color: ${(props) => props.$color};
`

const P2Gray600 = styled(P2)`
  color: ${colorGrayscale.gray600};
`

const ColorText = styled(P2)`
  ${(props) => (props.$show ? '' : 'display: none;')}
  color: ${colorGrayscale.gray500};
`

const ColorSetEnum = {
  BRAND: 'brand',
  GRAYSCALE: 'grayscale',
  OPACITY: 'opacity',
  PHOTO: 'photography',
  PODCAST: 'podcast',
  SUPPORTIVE: 'supportive',
  SEMANTIC: 'semantic',
  PINK_ARTICLE: 'pink_article',
}

const getColorSet = (type) => {
  switch (type) {
    case ColorSetEnum.BRAND:
      return colorBrand
    case ColorSetEnum.GRAYSCALE:
      return colorGrayscale
    case ColorSetEnum.OPACITY:
      return colorOpacity
    case ColorSetEnum.PHOTO:
      return colorPhoto
    case ColorSetEnum.PODCAST:
      return colorPodcast
    case ColorSetEnum.SUPPORTIVE:
      return colorSupportive
    case ColorSetEnum.SEMANTIC:
      return COLOR_SEMANTIC
    case ColorSetEnum['PINK_ARTICLE']:
      return COLOR_PINK_ARTICLE
  }
}

const ColorSet = ({ height, width, type, showColorText, background }) => {
  const colorSet = getColorSet(type)
  const colorBoxes = _.map(colorSet, (color, key) => {
    return (
      <Box key={`${type}-${key}`}>
        <P2Gray600 text={key} />
        <Color $height={height} $width={width} $color={color} />
        <ColorText text={color} $show={showColorText} />
      </Box>
    )
  })
  return <Container $background={background}>{colorBoxes}</Container>
}
ColorSet.propTypes = {
  background: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  type: PropTypes.oneOf(Object.values(ColorSetEnum)),
  showColorText: PropTypes.bool,
}

export default {
  title: 'Color',
  component: ColorSet,
  argTypes: {
    type: getRadioArg(ColorSetEnum, ColorSetEnum.GRAYSCALE),
    background: {
      control: {
        type: 'color',
        presetColors: [
          colorGrayscale.gray100,
          colorPhoto.dark,
          colorGrayscale.gray600,
        ],
      },
    },
  },
}

export const colorSet = {
  args: {
    height: '100px',
    width: '100px',
    type: ColorSetEnum.GRAYSCALE,
    showColorText: true,
    background: colorGrayscale.gray100,
  },
}
