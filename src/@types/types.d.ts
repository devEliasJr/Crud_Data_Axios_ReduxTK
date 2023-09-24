interface IDataProps {
  id: number;
  name: string;
  url: string;
  description: string;
}

interface ICustomCardProps {
  title: string;
  link: string;
  id: number;
}

type UserData = {
  name: string;
  url: string;
};

interface IDataEditProps {
  userId: number;
  userData: any;
}

interface IReactFcProps {
  children: ReactNode;
}