# WhaleSpotting

## Running the app
To run the app, first run `npm install` in the `WhaleSpotting/react-app` directory, then hit the play icon in Visual Studio or Rider.

## Testing the app
- To run the UI tests, navigate to `WhaleSpotting/react-app` and run `npm test`.
- To run the API tests, right click the `WhaleSpotting.UnitTests` project and chose to run tests.

## Preparing the database
To set up the database, navigate to `WhaleSpotting` and run `docker-compose up -d`.

- To add/remove a migration, navigate to `WhaleSpotting` and run `dotnet ef migrations add/remove [MIGRATION NAME]` or use the Package Manager Console.
- To update the database, navigate to `WhaleSpotting` and run `dotnet ef datbase update` or use the Package Manager Console.

## Deployments

This app is hosted on heroku and can be found at: https://whale-spotting-stg.herokuapp.com/ for the staging environment and https://whale-spotting-prod.herokuapp.com/ for the production environment. The staging environment will automatically update with pushes to main, to promote staging to production please contact one of the admins of the repo.
