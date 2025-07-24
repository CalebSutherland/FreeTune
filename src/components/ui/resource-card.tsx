import { Card, Image, Text, Button, Group } from "@mantine/core";

interface CreatorCardProps {
  name: string;
  description: string;
  imageUrl: string;
  link: string;
  linkLabel: string;
}

export default function CreatorCard({
  name,
  description,
  imageUrl,
  link,
  linkLabel,
}: CreatorCardProps) {
  return (
    <Card
      shadow="md"
      padding="lg"
      radius="md"
      style={{ backgroundColor: "var(--secondary-color)", width: "13rem" }}
    >
      <Card.Section>
        <Image src={imageUrl} height={160} alt="Norway" />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs" color="var(--text-color)">
        <Text fw={500}>{name}</Text>
      </Group>

      <Text size="sm" c="dimmed">
        {description}
      </Text>

      <a href={link}>
        <Button color="var(--accent-color)" fullWidth mt="md" radius="md">
          {linkLabel}
        </Button>
      </a>
    </Card>
  );
}
