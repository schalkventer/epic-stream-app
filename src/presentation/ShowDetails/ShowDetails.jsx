import styled from "@emotion/styled";
import { Skeleton } from "@mui/material";
import { Fragment } from "react";
import { format as formatDate } from "date-fns";
import schema from "./ShowDetails.schema";
import { COLORS } from "../../constants";
import TextElement from "../TextElement";

const Dot = styled.div`
  background: ${COLORS.foreground.dark};
  width: 0.25rem;
  height: 0.25rem;
  border-radius: 50%;
`;

const Genres = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
`;

const Wrapper = styled.div`
  background: ${COLORS.background.medium};
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  border-radius: 6px;
  height: 43rem;
  background-image: url(${(props) => props.image});
  background-position: 100% 100%;
  background-size: 70%;
  background-repeat: no-repeat;
  overflow: hidden;

  @media (min-width: 40rem) {
    height: 28rem;
  }
`;

const Title = styled.div`
  padding: 0.25rem 0;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  border-radius: 6px;
  backdrop-filter: blur(20px);
  flex-direction: column;

  background: linear-gradient(
    90deg,
    ${COLORS.background.medium} 50%,
    rgba(0, 0, 0, 0) 100%
  );

  @media (min-width: 40rem) {
    flex-direction: row;
  }
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;

  display: block;
  background: ${COLORS.background.light};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  height: 14rem;

  @media (min-width: 40rem) {
    width: 17.5rem;
    height: 100%;
  }
`;

const Paragraph = styled.div`
  max-width: 25rem;
`;

const Spacer = styled.div`
  padding: 2rem 0 1rem;
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 3rem 2rem;
  height: 100%;
`;

const ChildWrap = styled.div`
  width: 100%;
  max-width: 20rem;
  display: flex;
  justify-content: flex-start;
`;

export const Component = (props) => {
  const { image, title, genres, updated, description, children, seasons } =
    props;

  return (
    <Wrapper image={image}>
      <Row>
        <div>
          <Image src={image} loading="eager" />
        </div>

        <Side>
          <div>
            <Title>
              <TextElement.Component importance="primary" size="l">
                {title}
              </TextElement.Component>

              <TextElement.Component size="m" importance="primary">
                {seasons} Season{seasons.length > 1 && "s"}
              </TextElement.Component>
            </Title>

            <Spacer>
              <TextElement.Component size="m" importance="primary">
                {formatDate(updated, "d MMMM yyyy")}
              </TextElement.Component>

              <Genres>
                {genres.map((genreName, index) => (
                  <Fragment key={genreName}>
                    <TextElement.Component
                      size="m"
                      importance="primary"
                      key={genreName}
                    >
                      {genreName}
                    </TextElement.Component>

                    {index + 1 < genres.length && <Dot />}
                  </Fragment>
                ))}
              </Genres>
            </Spacer>

            <Paragraph>
              <TextElement.Component size="s" lines={5}>
                {description}
              </TextElement.Component>
            </Paragraph>
          </div>

          {children && <ChildWrap>{children}</ChildWrap>}
        </Side>
      </Row>
    </Wrapper>
  );
};

export const Placeholder = (props) => {
  const { children } = props;

  return (
    <Wrapper>
      <Row>
        <div>
          <Image as={Skeleton} alt="" variant="rectangular" />
        </div>

        <Side>
          <div>
            <Title>
              <TextElement.Placeholder
                importance="primary"
                size="l"
                width={12}
              />
              <TextElement.Placeholder
                size="m"
                importance="primary"
                width={4}
              />
            </Title>

            <Spacer>
              <TextElement.Placeholder
                size="m"
                importance="primary"
                width={7}
              />

              <Genres>
                <TextElement.Placeholder size="m" width={5} />
              </Genres>
            </Spacer>
          </div>

          {children}
        </Side>
      </Row>
    </Wrapper>
  );
};

Placeholder.propTypes = schema.placeholder;
Component.propTypes = schema.props;
