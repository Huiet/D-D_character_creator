import React from 'react';
import { Center } from '@mantine/core';
import CharacterSheet from '../components/CharacterSheet/CharacterSheet';

function CharacterCreator(props: any) {
  return (
    <>
      <Center>
        <CharacterSheet/>
      </Center>
    </>
  );
}

export default CharacterCreator;
