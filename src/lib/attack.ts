/** Link to a MITRE ATT&CK technique page, e.g. T1053.003 → /techniques/T1053/003/. */
export const attackUrl = (id: string) =>
  `https://attack.mitre.org/techniques/${id.replace(".", "/")}/`;
