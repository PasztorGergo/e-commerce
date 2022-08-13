import { gql } from "@apollo/client";
import {
  Group,
  Stack,
  Textarea,
  TextInput,
  Title,
  Text,
  NumberInput,
  Button,
  createStyles,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import React, { useCallback, useMemo, useState } from "react";
import { FaCheck, FaPlus, FaRegImage, FaTimes, FaUpload } from "react-icons/fa";
import { client } from "../../app";

const useStyles = createStyles((theme) => ({
  button: {
    background: "#FF506E",
    "&:hover": {
      background: theme.fn.darken("#FF506E", 0.05),
    },
  },
}));

export default function AddProduct() {
  const fr = useMemo(() => new FileReader(), []);
  const { classes } = useStyles();
  const [picture, setPicture] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm({
    initialValues: {
      name: "",
      price: 0,
      description: "",
    },
    clearInputErrorOnChange: true,
  });

  const uploadProduct = useCallback(
    async (name: string, description: string, price: number, img: string) => {
      console.log(price);
      try {
        const product = (
          await client.mutate({
            mutation: gql`
            mutation AddProduct {
              insertOneProduct(
                data: {
                  stripe_id: ""
                  description: "${description}"
                  name: "${name.toLowerCase().replaceAll(" ", "-")}"
                  price: ${price}
                  rating: 0.00,
                  photoURL: "${img}"
                }
              ) {
                name
              }
            }
          `,
          })
        ).data.insertOneProduct;
        showNotification({
          message: `${product.name} has been added`,
          icon: <FaCheck />,
          color: "teal",
          autoClose: 3000,
        });
      } catch (error: any) {
        console.error({ message: error.message });
        showNotification({
          message: "An error occured",
          icon: <FaTimes />,
          color: "red",
          autoClose: 3000,
        });
      }
    },
    []
  );

  return (
    <Stack>
      <Title>New Product</Title>
      <form
        onSubmit={form.onSubmit(({ name, description, price }) =>
          uploadProduct(name, description, price, picture)
        )}
      >
        <Group>
          <Dropzone
            onDrop={(f) => {
              setLoading(true);

              fr.onload = (e) => {
                if (e.target?.readyState === 2) {
                  //@ts-ignore
                  setPicture(e.target.result);
                  setLoading(false);
                }
              };
              fr.readAsDataURL(f[0]);
            }}
            accept={IMAGE_MIME_TYPE}
            sx={{
              background: "none",
              backgroundImage: picture ? `url("${picture}")` : "",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "40%",
            }}
          >
            <Group position="center" spacing="xl">
              <Dropzone.Accept>
                <FaUpload size={50} opacity={0.3} color="#FF506E" />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <FaTimes size={50} opacity={0.3} color="#FF506E" />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <FaRegImage size={50} opacity={0.3} color="#1E293B" />
              </Dropzone.Idle>
              {!picture && <Text>Drop your new profile picture here</Text>}
            </Group>
          </Dropzone>
          <Stack>
            <Group>
              <TextInput
                label="Item Name"
                {...form.getInputProps("name")}
                required
              />
              <NumberInput
                label="Item Price"
                decimalSeparator="."
                step={0.5}
                stepHoldDelay={500}
                precision={2}
                stepHoldInterval={100}
                required
                {...form.getInputProps("price")}
              />
            </Group>
            <Textarea
              label="Item Description"
              {...form.getInputProps("description")}
            />
          </Stack>
        </Group>
        <Button
          disabled={loading}
          rightIcon={<FaPlus />}
          className={classes.button}
          type="submit"
        >
          Create
        </Button>
      </form>
    </Stack>
  );
}
