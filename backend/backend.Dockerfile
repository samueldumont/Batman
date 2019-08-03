# Dockerfile - this is a comment. Delete me if you want.
FROM python:3

RUN mkdir /app

ARG BUILDID=0
ENV BUILDID=$BUILDID

RUN apt-get update \
  && apt-get dist-upgrade -y \
  && apt-get install -y --no-install-recommends curl ca-certificates \
  && apt-get clean -y \
  && apt-get autoremove -y \
  && rm -rf /tmp/* /var/tmp/* \
  && rm -rf /var/lib/apt/lists/*

COPY ["*.py", "requirements.txt", "app/"]
WORKDIR /app

RUN pip install -r requirements.txt

RUN echo 0.0.$BUILDID > VERSION

EXPOSE 80
CMD ["gunicorn", "-w", "8", "-b", "0.0.0.0:80", "wsgi:app"]
