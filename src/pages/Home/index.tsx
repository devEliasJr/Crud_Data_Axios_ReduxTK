import { Box } from "@mui/material";
import CardsComponents from "../../components/cards";
import { useGetAllUsersQuery } from "../../hooks/useUserApiQuery";
import { useState, useEffect } from "react";
import { useQueryContext } from "../../Contexts/useQueryContext";

export default function HomePage() {
  const { data: users, error, isLoading } = useGetAllUsersQuery();
  const [filteredData, setFilteredData] = useState<IDataProps[]>();
  const { query } = useQueryContext();

  useEffect(() => {
    if (query && users) {
      const lowerCaseQuery = query.toLowerCase();
      const newData = users.filter((user) =>
        user.name.toLocaleLowerCase().includes(lowerCaseQuery)
      );
      setFilteredData(newData);
    } else {
      setFilteredData(users);
    }
  }, [query, users]);

  return (
    <Box>
      <CardsComponents user={filteredData} error={error} loading={isLoading} />
    </Box>
  );
}
