import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  render,
} from "@react-email/components";
import * as React from "react";

interface Props {
  username: string;
  href: string;
}

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const ResetEmail = ({ username, href }: Props) => {
  return (
    <Html>
      <Head />
      <Preview>Shoppagator - reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://firebasestorage.googleapis.com/v0/b/portfolio-52b82.appspot.com/o/alligator-preview.png?alt=media&token=bd58aa6c-5bb3-4dca-83bb-1084c4db96f1"
            width="80"
            height="80"
            alt="Shopaggator Mascot"
          />
          <Section>
            <Text style={text}>Hi {username},</Text>
            <Text style={text}>
              Someone recently requested a password change for your account. If
              this was you, you can set a new password here:
            </Text>
            <Button style={button} href={href}>
              Reset password
            </Button>
            <Text style={text}>
              If you don&apos;t want to change your password or didn&apos;t
              request this, just ignore and delete this message.
            </Text>
            <Text style={text}>
              To keep your account secure, please don&apos;t forward this email
              to anyone. See our privacy policy for{" "}
              <Link style={anchor} href={`${baseUrl}/privacy-policy`}>
                more security tips.
              </Link>
            </Text>
            <Text style={text}>Happy Gator Shopping!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export const ResetEmailHtml = (props: Props) => {
  return render(<ResetEmail {...props} />, { pretty: true });
};

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#22c383",
  borderRadius: "4px",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "16px",
  textDecoration: "none",
  display: "block",
  padding: "12px 12px",
  color: "#fff",
  textAlign: "center" as const,
};

const anchor = {
  textDecoration: "underline",
  color: "#22c383",
};
