import { MantineProvider, Text, Button, Stack, AppShell, Navbar, Header } from "@mantine/core";
import { theme } from "./theme";
import GlobalNav from './components/GlobalNav';
import GlobalHeader from './components/GlobalHeader';
import CharacterCreator from './pages/CharacterCreator';

export default function App() {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <AppShell
        padding="md"
        // navbar={<Navbar width={{ base: 300 }} height={500} p="xs">
        //   <GlobalNav></GlobalNav>
        // </Navbar>}
        header={<Header height={60} p="xs">{
          <GlobalHeader></GlobalHeader>
        }</Header>}
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
      >
        <CharacterCreator></CharacterCreator>
      </AppShell>
    </MantineProvider>
  );
}
