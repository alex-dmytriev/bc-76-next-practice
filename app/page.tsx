import Container from " @/components/Container/Container";
import Section from " @/components/Section/Section";
import Image from "next/image";

export default function Home() {
  return (
    <Section>
      <Container>
        <h1>Welcome to TaskHub from the students of group BC76😎</h1>
        <Image
          src="https://images.pexels.com/photos/2034373/pexels-photo-2034373.jpeg"
          alt="TaskHub"
          width="750"
          height="450"
        />
        <Image
          src="https://plus.unsplash.com/premium_photo-1683910767532-3a25b821f7ae?q=80&w=808&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="TaskHub"
          width="750"
          height="650"
        />
      </Container>
    </Section>
  );
}
