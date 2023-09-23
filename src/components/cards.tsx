import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import SkeletonComponent from "./skeleton";
import { useState } from "react";

import EditUserModal from "./modal";
import { useDeleteUserMutate } from "../hooks/useUserMutate";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const CustomCard = ({ title, link, id }: ICustomCardProps) => {
  const [userId, setUserId] = useState<number | undefined>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { mutate } = useDeleteUserMutate();

  const handleEdit = async (id: number) => {
    setUserId(id);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (shouldDelete) {
      mutate(id);
    }
  };

  return (
    <Card key={id}>
      {/* <EditCardModal /> */}
      <CardContent>
        <Typography component={"h5"}>{title}</Typography>
      </CardContent>
      <CardMedia
        component="img"
        src={link}
        alt="Descrição da imagem"
        title="Título da imagem"
        sx={{ width: "100%", height: 250 }}
      />

      <CardContent>Teste Content</CardContent>
      <Divider />
      <CardActions>
        <Button
          startIcon={<EditIcon />}
          variant="contained"
          color="secondary"
          onClick={() => handleEdit(id)}
        >
          Edit
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          variant="contained"
          color="primary"
          onClick={() => handleDelete(id)}
        >
          Delete
        </Button>
      </CardActions>
      {/* Modal de edição */}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        userId={Number(userId)}
      />
    </Card>
  );
};

type IUserProps = {
  user: IDataProps[] | undefined;
  loading: boolean;
  error: Error | null;
};

export default function CardsComponent({ user, error, loading }: IUserProps) {
  return (
    <Box maxWidth={"1500px"} m={"0 auto"} p={2}>
      <Grid container spacing={2}>
        {!error && loading && (
          <Box width={"100%"} py={8}>
            <Box
              display={"flex"}
              justifyContent={"center"}
              gap={4}
              flexWrap={"wrap"}
            >
              <SkeletonComponent />
              <SkeletonComponent />
              <SkeletonComponent />
              <SkeletonComponent />
            </Box>
          </Box>
        )}
        {error ? (
          <Box width={"100%"} py={8}>
            <Box display={"flex"} justifyContent={"center"}>
              <Alert severity="error">{error.message}</Alert>
            </Box>
          </Box>
        ) : (
          user &&
          user.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={Math.random()}>
              <CustomCard id={item.id} title={item.name} link={item.url} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
