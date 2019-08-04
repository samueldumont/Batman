import click
import utils


@click.group()
def main():
    pass


@main.command()
@click.argument('folder')
@click.option('-f', '--fake', 'fake', default=False, type=bool, show_default=True)
def scan(folder, fake):
    utils.scan(folder, fake)


if __name__ == "__main__":
    main()
