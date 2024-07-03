import { hydrateRoot } from 'react-dom/client';
import React from 'react';
import { Page } from '../views/Page';

window.addEventListener('DOMContentLoaded', () => {
  hydrateRoot(document.getElementById('root'), React.createElement(Page, {}, null));
})