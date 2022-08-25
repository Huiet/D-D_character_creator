import React from 'react';
import { useState } from 'react';
import { MultiSelect, Select, Input, Textarea, NumberInput, Container } from '@mantine/core';
import { fork } from 'child_process';

export const Alignments = [
  {value: 'LG', label: 'Lawful Good '},
  {value: 'NG', label: 'Neutral Good '},
  {value: 'CG', label: 'Chaotic Good '},
  {value: 'LN', label: 'Lawful Neutral '},
  {value: 'N', label: 'True Neutral '},
  {value: 'CN', label: 'Chaotic Neutral '},
  {value: 'LE', label: 'Lawful Evil '},
  {value: 'NE', label: 'Neutral Evil '},
  {value: 'CE', label: 'Chaotic Evi '}
];

export const Races = [
  {value: 'lizard', label: 'Lizard'},
  {value: 'dwarf', label: 'Dwarf'},
  {value: 'human', label: 'Human'},
  {value: 'elf', label: 'Elf'},
  {value: 'ork', label: 'Ork'},
  {value: 'half-ork', label: 'Ork'},
  {value: 'spoon', label: 'Spoon'},
]

export const Classes = [
  {value: 'paladin', label: 'Paladin', die: 10},
  {value: 'fighter', label: 'Fighter', die: 10},
  {value: 'ranger', label: 'Ranger', die: 10},
  {value: 'rogue', label: 'Rogue', die: 8},
  {value: 'wizard', label: 'Wizard', die: 6},
  {value: 'Druid', label: 'Paladin', die: 8},
  {value: 'sorcerer', label: 'Sorcerer', die: 6},
  {value: 'warlock', label: 'Warlock', die: 8},
  {value: 'monk', label: 'Monk', die: 8},
  {value: 'bard', label: 'Bard', die: 8},
  {value: 'barbarian', label: 'Barbarian', die: 12}
]

export const Armor = [
  {value: 'padded'},
  {value: 'leather'},
  {value: 'studded leather'},
  {value: 'hide'},
  {value: 'chain shirt'},
  {value: 'scale mail'},
  {value: 'breastplate'},
  {value: 'half plate'},
  {value: 'ring mail'},
  {value: 'chain mail'},
  {value: 'splint'},
  {value: 'plate'}
]

function calculateArmorClass() {

}

function CharacterSheet(props: any) {
  const [name, setName] = useState("");
  const [clazz, setClazz] = useState(Classes.find(c => c.value === 'fighter'));
  const [level, setLevel] = useState(1);
  const [background, setBackground] = useState("");
  const [player, setPlayer] = useState("");
  const [race, setRace] = useState(Races.find(r => r.value === 'human'));
  const [alignment, setAlignment] = useState("N");
  const [exp, setExp] = useState(0);
  const [armorClass, setArmorClass] = useState(10);
  const [initiative, setInitiative] = useState(0);
  const [maxHitpoints, setMaxHitpoints] = useState(0);
  const [hitDice, setHitDice] = useState(1);
  const [attacks, setAttacks] = useState([]);

  const [equippedArmor, setEquippedArmor] = useState("")

  const levelHandler = (input: number) => {
    setLevel(input);
    setHitDice(input);
  }

  const getClassIcon = () => {
    switch (clazz?.value) {
      case 'bard':
        return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-music" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
         <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
         <circle cx="6" cy="17" r="3"></circle>
         <circle cx="16" cy="17" r="3"></circle>
         <polyline points="9 17 9 4 19 4 19 17"></polyline>
         <line x1="9" y1="8" x2="19" y2="8"></line>
        </svg>

      case 'ranger':
      case 'wizard':
        return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bow" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
         <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
         <path d="M17 3h4v4"></path>
         <path d="M21 3l-15 15"></path>
         <path d="M3 18h3v3"></path>
         <path d="M16.5 20c1.576 -1.576 2.5 -4.095 2.5 -6.5c0 -4.81 -3.69 -8.5 -8.5 -8.5c-2.415 0 -4.922 .913 -6.5 2.5l12.5 12.5z"></path>
        </svg>

      case 'monk':
        return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-sword-off" width="24"
                    height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                    strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path
            d="M11.934 7.942l3.066 -3.942h5v5l-3.93 3.057m-2.253 1.752l-2.817 2.191l-4 4l-3 -3l4 -4l2.174 -2.795"></path>
          <path d="M6.5 11.5l6 6"></path>
          <path d="M3 3l18 18"></path>
        </svg>
      case 'barbarian':
        return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-axe" width="24" height="24"
             viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
             strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M13 9l7.383 7.418c.823 .82 .823 2.148 0 2.967a2.11 2.11 0 0 1 -2.976 0l-7.407 -7.385"></path>
          <path
            d="M6.66 15.66l-3.32 -3.32a1.25 1.25 0 0 1 .42 -2.044l3.24 -1.296l6 -6l3 3l-6 6l-1.296 3.24a1.25 1.25 0 0 1 -2.044 .42z"></path>
        </svg>
      default:
        return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-sword" width="24"
                    height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                    strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M20 4v5l-9 7l-4 4l-3 -3l4 -4l7 -9z"></path>
          <path d="M6.5 11.5l6 6"></path>
        </svg>


    }
  }


  return (

    <Container size="md">


      <form>
        {/*<div>Name: {name}</div>*/}
        <Input
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-circle" width="24"
                 height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                 strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <circle cx="12" cy="12" r="9"></circle>
              <circle cx="12" cy="10" r="3"></circle>
              <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
            </svg>
          }
          placeholder="Your Name"
        />
        {/*<div className="w-1/2">*/}
        <Textarea
          className="w-80"
          autosize
          placeholder="In west Philadelphia born and raised.... "
          label="Background"
        />
        <Select
          value={clazz?.value}
          onChange={event => setClazz(Classes.find(x => x.value === event))}
          data={Classes}
          label="Class"
          placeholder=""
          icon={
            getClassIcon()
          }
        />
        <NumberInput
          defaultValue={0}
          label="Level"
          onChange={levelHandler}
        />
        <div>Player Name: {player}</div>
        <Select
          data={Races}
          label="Race"
          placeholder=""
        />

        <Select
          data={Alignments}
          label="Alignment"
          placeholder="What are you?"
        />


        <div>Experience: {exp}</div>
        <div>Armor Class: {armorClass}</div>
        <div>Initiative: {initiative}</div>
        <div>HitDice: {hitDice}d{clazz?.die}</div>
      </form>
    </Container>
  );
}

export default CharacterSheet;
