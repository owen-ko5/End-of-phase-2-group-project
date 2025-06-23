export async function searchMoviesOnArchive(title) {
  const query = encodeURIComponent(`${title}`);
  const url = `https://archive.org/advancedsearch.php?q=${query}+AND+mediatype:movies&fl[]=identifier&rows=1&page=1&output=json`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.response.docs.length > 0) {
    return data.response.docs[0].identifier;
  }
  return null;
}

export async function getMovieFile(identifier) {
  const res = await fetch(`https://archive.org/metadata/${identifier}`);
  const data = await res.json();

  const file = data.files.find(f =>
    f.name.endsWith('.mp4') || f.name.endsWith('.mkv')
  );

  return file ? `https://archive.org/download/${identifier}/${file.name}` : null;
}
