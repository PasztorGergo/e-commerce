import { Group, Stack, Textarea, TextInput, Title, Text } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { FaRegImage, FaTimes, FaUpload } from "react-icons/fa";

export default function AddProduct() {
  const [picture, setPicture] = useState<any>();
  const form = useForm({
    initialValues: {
      name: "",
      price: 0.0,
      description: "",
    },
  });

  const uploadProduct = async () => {};

  return (
    <Stack>
      <Title>New Product</Title>
      <form>
        <Group>
          <Dropzone
            onDrop={(e) => {
              const fr = new FileReader();
              fr.onload((e) => {});
              fr.readAsDataURL(e[0]);
            }}
            accept={IMAGE_MIME_TYPE}
          >
            <Group position="center" spacing="xl">
              <Dropzone.Accept>
                <FaUpload size={50} color="#FF506E" />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <FaTimes size={50} color="#FF506E" />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <FaRegImage size={50} color="#1E293B" />
              </Dropzone.Idle>
              <Text>Drop your new profile picture here</Text>
            </Group>
          </Dropzone>
          <Stack>
            <TextInput />
            <Textarea />
          </Stack>
        </Group>
      </form>
    </Stack>
  );
}
