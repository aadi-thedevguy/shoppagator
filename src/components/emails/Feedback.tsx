import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  render,
} from "@react-email/components";
import * as React from "react";

interface Props {
  username: string;
  feedback: string;
  email: string;
}

const FeedbackEmail = ({ feedback, username, email }: Props) => {
  const previewText = `Read ${username}'s feedback`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section>
            <Img
              src="https://firebasestorage.googleapis.com/v0/b/portfolio-52b82.appspot.com/o/alligator-preview.png?alt=media&token=bd58aa6c-5bb3-4dca-83bb-1084c4db96f1"
              width="80"
              height="80"
              alt="Shopaggator Mascot"
            />
          </Section>

          <Section style={{ paddingBottom: "20px" }}>
            <Row>
              <Text style={heading}>Here's what {username} wrote</Text>
              <Text style={review}>{feedback}</Text>
              <Text style={{ ...paragraph, paddingBottom: "16px" }}>
                you can reply to the feedback by mailing back to{" "}
                <Link href={`mailto:${email}`}>{email}</Link>
              </Text>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export const FeedbackEmailHtml = (props: Props) =>
  render(<FeedbackEmail {...props} />, {
    pretty: true,
  });

export default FeedbackEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
  maxWidth: "100%",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const paragraph = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#484848",
};

const review = {
  ...paragraph,
  padding: "24px",
  backgroundColor: "#f2f3f3",
  borderRadius: "4px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};
