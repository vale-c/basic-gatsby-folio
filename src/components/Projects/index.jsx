import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Link from "gatsby-link"
import { motion } from "framer-motion"

import Container from "../UI/Container"
import TitleSection from "../UI/TitleSection"

import * as Styled from "./styled"

const Projects = () => {
  const { markdownRemark, allMarkdownRemark } = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { category: { eq: "work section" } }) {
        frontmatter {
          title
          subtitle
        }
      }
      allMarkdownRemark(
        filter: {
          frontmatter: { category: { eq: "work" }, published: { eq: true } }
        }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            id
            html
            fields {
              slug
            }
            frontmatter {
              title
              description
              date(formatString: "MMM DD, YYYY")
              tags
              cover {
                childImageSharp {
                  fluid(maxWidth: 800) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const projectSectionTitle = markdownRemark.frontmatter
  const projects = allMarkdownRemark.edges

  return (
    <Container section>
      <TitleSection
        title={projectSectionTitle.title}
        subtitle={projectSectionTitle.subtitle}
        center
      />
      <Styled.Projects>
        {projects.map(item => {
          const {
            id,
            fields: { slug },
            frontmatter: { title, cover, description, date, tags },
          } = item.node

          return (
            <Styled.Project key={id}>
              <Link to={slug}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Styled.Card>
                    <Styled.Image>
                      <Img fluid={cover.childImageSharp.fluid} alt={title} />
                    </Styled.Image>
                    <Styled.Content>
                      <Styled.Date>{date}</Styled.Date>
                      <Styled.Title>{title}</Styled.Title>
                      <Styled.Description>{description}</Styled.Description>
                    </Styled.Content>
                    <Styled.Tags>
                      {tags.map(item => (
                        <Styled.Tag key={item}>{item}</Styled.Tag>
                      ))}
                    </Styled.Tags>
                  </Styled.Card>
                </motion.div>
              </Link>
            </Styled.Project>
          )
        })}
      </Styled.Projects>
    </Container>
  )
}

export default Projects
