import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
// constants
import predefinedPropTypes from '../../constants/prop-types/body'
import styles from '../../constants/css'
import typography from '../../constants/typography'
// @twreporter
import {
  colorGrayscale,
  colorSupportive,
  COLOR_PINK_ARTICLE,
} from '@twreporter/core/lib/constants/color'
import mq from '@twreporter/core/lib/utils/media-query'
import { ARTICLE_THEME } from '@twreporter/core/lib/constants/theme'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const QuoteContent = styled.blockquote`
  /* line breaks */
  white-space: pre-wrap;

  /* clear default margin */
  margin: 0;

  font-weight: ${typography.font.weight.normal};
  font-size: ${(props) => props.theme.fontSizeOffset + 32}px;
  line-height: 1.56;
  letter-spacing: 1.1px;
  text-align: center;
  ${mq.tabletAndBelow`
    font-size: ${(props) => props.theme.fontSizeOffset + 24}px;
  `}
`

const QuoteBy = styled.cite`
  margin: 25px auto 0 auto;
  display: block;
  font-style: normal;
  font-weight: ${typography.font.weight.normal};
  font-size: ${(props) => props.theme.fontSizeOffset + 16}px;
  line-height: 1.56;
  letter-spacing: 0.5px;
  text-align: center;
  ${styles.linkChildren}
`

const VerticalLine = styled.div`
  width: 2px;
  height: 80px;
  margin: 0 auto 40px auto;
`

const QuoteContainer = styled.div`
  ${(props) => getQuoteContainerStyles(props.theme.name)}
`

function getQuoteContainerStyles(themeName) {
  switch (themeName) {
    case ARTICLE_THEME.v2.pink:
      return css`
        ${QuoteContent}, ${QuoteBy} {
          color: ${colorGrayscale.gray800};
        }

        ${VerticalLine} {
          background-color: ${COLOR_PINK_ARTICLE.pink};
        }
      `
    case ARTICLE_THEME.v2.photo:
      return css`
        ${QuoteContent}, ${QuoteBy} {
          color: ${colorGrayscale.gray300};
        }

        ${VerticalLine} {
          background-color: ${colorSupportive.heavy};
        }
      `
    case ARTICLE_THEME.v2.default:
    default:
      return css`
        ${QuoteContent}, ${QuoteBy} {
          color: ${colorGrayscale.gray800};
        }

        ${VerticalLine} {
          background-color: ${colorSupportive.main};
        }
      `
  }
}

const CenteredQuote = ({ data, className }) => {
  const content = _.get(data, ['content', 0, 'quote'])
  const by = _.get(data, ['content', 0, 'quoteBy'])
  return content ? (
    <QuoteContainer className={className}>
      <VerticalLine />
      <QuoteContent dangerouslySetInnerHTML={{ __html: content }} />
      {by ? <QuoteBy dangerouslySetInnerHTML={{ __html: by }} /> : null}
    </QuoteContainer>
  ) : null
}
CenteredQuote.propTypes = {
  className: PropTypes.string,
  data: predefinedPropTypes.elementData.isRequired,
}

export default CenteredQuote
