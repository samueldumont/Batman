import click
import utils


@click.group()
def main():
    pass


@main.command()
@click.argument('folder')
def scan(folder):
    utils.scan(folder)


if __name__ == "__main__":
    main()
