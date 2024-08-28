# App

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is almost ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/nx-api/node?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/node:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/node:lib mylib
```

## Image service

### Build and run docker image-service

- Build Docker Image:

```sh
docker build -t image-service:latest -f apps/image-service/Dockerfile .
```

- Run the Docker Container:

```sh
docker run -p 8080:8080 image-service:latest
```

## Client service

### Build and run docker client

- Build Docker Image:

```sh
docker build -t client:latest -f apps/client/Dockerfile .
```

- Run the Docker Container:

```sh
docker run -p 3000:3000 client:latest
```


## Analysis service

### Build and run docker analysis-service

- Build Docker Image:

```sh
docker build -t analysis-service:latest -f apps/analysis-service/Dockerfile .
```

- Run the Docker Container:

```sh
docker run -p 80:80 analysis-service:latest
```

## Documentation

**Disclaimer:** These are sample files, not definite guidelines. Feel free to
make adjustments as you see fitting for your team & use-cases!

- [Document image service](./apps/image-service/README.md)
- [Document client service](./apps/client/README.md)
- [Document analysis service](./apps/analysis-service/README.md)