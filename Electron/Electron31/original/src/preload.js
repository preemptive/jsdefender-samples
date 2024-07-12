import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    fetchPlanets: () => ipcRenderer.invoke('fetch-planets')
});
