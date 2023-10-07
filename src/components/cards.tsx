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

import EditUserModal from "./modal";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useEffect, useState } from "react";

import { deleteUser, getAllData } from "../Store/Slices/userSlice";
import { useQueryContext } from "../Contexts/useQueryContext";
import { useAppDispatch, useAppSelector } from "../hooks/useAppReduxActions";
import Pagination from "@mui/material/Pagination";

const CustomCard = ({ title, link, id }: ICustomCardProps) => {
  const [userId, setUserId] = useState<number | undefined>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const dispatch = useAppDispatch();

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
      dispatch(deleteUser(id));
    }
  };

  return (
    <Card key={id}>
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
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        userId={Number(userId)}
      />
    </Card>
  );
};

export default function CardsComponent() {
  const dispatch = useAppDispatch();

  const { users, error, loading } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]);

  const { query } = useQueryContext();
  const [filteredData, setFilteredData] = useState<IDataProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  //@ts-ignore - if you want use this state to set itens per page dynamically
  const [itensPerPage, setItensPerPage] = useState(6);

  const page = Math.ceil(filteredData.length / itensPerPage);

  const initialIndex = (currentPage - 1) * itensPerPage;
  const endIndex = initialIndex + itensPerPage;
  const currentIndex = filteredData?.slice(initialIndex, endIndex);

  useEffect(() => {
    if (query && users) {
      const lowerCaseQuery = query.toLowerCase();
      const newData = users.filter((user: IDataProps) =>
        user.name.toLocaleLowerCase().includes(lowerCaseQuery)
      );
      setFilteredData(newData);
    } else {
      setFilteredData(users);
    }
  }, [query, users]);

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
              <Alert severity="error">{error}</Alert>
            </Box>
          </Box>
        ) : (
          currentIndex &&
          !loading &&
          currentIndex.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={Math.random()}>
              <CustomCard id={item.id} title={item.name} link={item.url} />
            </Grid>
          ))
        )}
      </Grid>
      <Box margin={"0 auto"} display={"flex"} justifyContent={"center"} py={2}>
        {!loading && (
          <Pagination
            count={page}
            page={currentPage}
            // @ts-ignore - Mui requires 'e' to work
            onChange={(e, newvalue) => setCurrentPage(newvalue)}
            variant="text"
            color="secondary"
            sx={{ background: "white", padding: "10px", borderRadius: "4px" }}
          />
        )}
      </Box>
    </Box>
  );
}
