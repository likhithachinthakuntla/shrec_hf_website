import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as GiGears from 'react-icons/gi';
export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'What you want?',
    path: '/pipeline_selection',
    icon: <GiGears.GiChoice />,
    cName: 'nav-text'
  },
  {
    title: 'How It Works',
    path: '/mla_Info',
    icon: <AiIcons.AiFillSetting />,
    cName: 'nav-text'
  },
  {
    title: 'Inputs',
    path: '/userInputs',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'ETL',
    path: '/etl',
    icon: <GiGears.GiGears />,
    cName: 'nav-text'
  },
  {
    title: 'Training',
    path: '/training',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Inference',
    path: '/inference',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  }
];