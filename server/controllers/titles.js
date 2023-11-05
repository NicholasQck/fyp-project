import prisma from '../prisma/client.js';
import cohere from 'cohere-ai';
import { HfInference } from '@huggingface/inference';
import { StatusCodes } from 'http-status-codes';

export const getAllTitles = async (req, res) => {
  const { search } = req.query;
  let titles = await prisma.title.findMany({
    orderBy: {
      proposedBy: 'asc',
    },
    include: {
      supervisor: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  if (search) {
    console.log(search);
    const tempTitlesName = titles.map((title) => {
      return title.titleName;
    });

    const tempTitlesField = titles.map((title) => {
      return title.fieldArea;
    });

    const hf = new HfInference(process.env.HF_ACCESS_TOKEN);
    let titleNameResult = await hf.sentenceSimilarity({
      model: 'sentence-transformers/all-MiniLM-L6-v2',
      inputs: {
        source_sentence: search,
        sentences: tempTitlesName,
      },
    });

    let titleFieldResult = await hf.sentenceSimilarity({
      model: 'sentence-transformers/all-MiniLM-L6-v2',
      inputs: {
        source_sentence: search,
        sentences: tempTitlesField,
      },
    });

    const titleScores = titles
      .map((title, index) => {
        return {
          ...title,
          score: (titleNameResult[index] + titleFieldResult[index]) / 2,
        };
      })
      .sort((a, b) => {
        return b.score - a.score;
      });

    titles = titleScores.filter((title) => title.score > 0.3);
    console.log(titles);
  }
  res.status(StatusCodes.OK).json({ titles });
};

export const getTitle = async (req, res) => {
  const { user_id } = req.query;
  const titles = await prisma.title.findMany({
    where: {
      proposedBy: user_id,
    },
    orderBy: {
      titleName: 'asc',
    },
    include: {
      supervisor: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  res.status(StatusCodes.OK).json({ titles });
};

export const createTitle = async (req, res) => {
  const { proposedBy, titleName, fieldArea, titleDesc } = req.body;
  const title = await prisma.title.create({
    data: {
      proposedBy,
      titleName,
      fieldArea,
      titleDesc,
    },
  });
  res
    .status(StatusCodes.CREATED)
    .json({ title, msg: 'Title created successfully' });
};

export const updateTitle = async (req, res) => {
  const { id } = req.params;
  const { proposedBy, titleName, fieldArea, titleDesc } = req.body;
  const title = await prisma.title.update({
    where: { titleID: id },
    data: {
      proposedBy,
      titleName,
      fieldArea,
      titleDesc,
    },
  });
  res.status(StatusCodes.OK).json({ title, msg: 'Title updated' });
};

export const deleteTitle = async (req, res) => {
  const { id } = req.params;
  const title = await prisma.title.delete({
    where: {
      titleID: id,
    },
  });
  res.status(StatusCodes.OK).json({ title, msg: 'Title deleted' });
};

export const generateTitle = async (req, res) => {
  const { genKeyword } = req.body;
  cohere.init(process.env.COHERE_API_KEY);
  const generator = await cohere.generate({
    model: 'command',
    prompt: `Suggest one project title suitable for a final year project that is related to ${genKeyword} in the context of computer science. Your response should only be one line, which is the project title. Display the project title in this form: #title#.`,
    max_tokens: 100,
    temperature: 0.7, //used to change the creativity, lower value gives a "correct" answer while larger value gives creative answers (value: 0 - 2)
    k: 0,
    stop_sequences: [],
    return_likelihoods: 'NONE',
  });
  const result = generator.body.generations[0].text;
  const genTitle = result.split('#')[1];

  res.status(StatusCodes.OK).json({ genTitle });
};
